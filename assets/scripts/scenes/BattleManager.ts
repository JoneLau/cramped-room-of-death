import { _decorator, Component, Event, math, Node } from 'cc';
import { IEntity, ITile, levels } from '../../configs/levels';
import { globalEvent, TILE_HEIGHT, TILE_WIDTH } from '../base/DataConfig';
import { Door } from '../component/Door';
import { Enemy } from '../component/Enemy';
import { Player } from '../component/Player';
import { Shake } from '../component/Shake';
import { TileMapShakeController } from '../component/TileMapShakeController';
import { TileMapView } from '../component/TileMapView';
import { ENTITY_BEHAVIOR, ENTITY_TYPE, GAME_EVENT, MOVE_DIRECTION, TILE_BLOCK_TYPE, TILE_TYPE } from '../enum/GameEnum';
import { DataManager, IRecord } from '../manager/DataManager';
import { ResourceManager } from '../manager/ResourceManager';
import { NodeUtil } from '../utils/NodeUtil';
const { ccclass, property } = _decorator;

@ccclass('BattleManager')
export class BattleManager extends Component {
    @property(Node)
    btnUp: Node;

    @property(Node)
    btnDown: Node;

    @property(Node)
    btnLeft: Node;

    @property(Node)
    btnRight: Node;

    @property(Node)
    btnTurnLeft: Node;

    @property(Node)
    btnTurnRight: Node;

    private _stage: Node;

    start() {
        globalEvent.on(GAME_EVENT.NEXT_LEVEL, this.nextLevel, this);
        globalEvent.on(GAME_EVENT.RECORD_STEP, this.recordStep, this);
        this.createStage();
        this.buildLevel();
    }

    onDestroy() {
        globalEvent.off(GAME_EVENT.NEXT_LEVEL, this.nextLevel, this);
        globalEvent.off(GAME_EVENT.RECORD_STEP, this.recordStep, this);
    }

    /** 控制器处理 */
    handleCtrl(event: Event, type: string) {
        globalEvent.emit(GAME_EVENT.PLAYER_CTRL, type);
    }

    nextLevel() {
        DataManager.instance.level++;
        this.buildLevel();
    }

    reset() {
        this._stage && this._stage.destroyAllChildren();
        const dataInst = DataManager.instance;
        dataInst.enemies.length = 0;
        dataInst.player = null;
        dataInst.records.length = 0;
    }


    //#region 初始化场景
    /** 舞台创建 */
    createStage() {
        this._stage = NodeUtil.createUINode("stage");
        this._stage.parent = this.node;
        this._stage.setSiblingIndex(2);
        this._stage.addComponent(TileMapShakeController);
        this._stage.addComponent(Shake);
    }

    /** 关卡构建 */
    async buildLevel() {
        const currLevel = levels[`level${DataManager.instance.level}`];
        if (!currLevel) return console.warn("当前关卡数量不够拉~~~~");
        this.reset();
        // this.level = currLevel;

        const mapInfo = currLevel.mapInfo;
        DataManager.instance.tileBlockState = new Array(mapInfo.length * mapInfo[0].length);
        DataManager.instance.row = mapInfo.length;
        DataManager.instance.col = mapInfo[0].length;
        Promise.all([
            this.createTileMap(currLevel.mapInfo),
            this.createEnemies(currLevel.enemies),
            this.createDoor(currLevel.door),
            this.createPlayer(currLevel.player),
        ])
    }

    /** 创建地图 */
    async createTileMap(mapInfo: Array<Array<ITile>>) {
        const map = NodeUtil.createUINode("tileMap");
        map.parent = this._stage;
        const spriteFrames = await ResourceManager.instance.loadDir("texture/tile/tile")

        //按列填充，左上角开始
        const dataInst = DataManager.instance;
        const row = mapInfo.length;
        const col = mapInfo[0].length;
        for (let i = 0; i < row; i++) {
            const colDatas = mapInfo[i];
            for (let j = 0; j < col; j++) {
                const colData = colDatas[j];
                const { src, type } = colData;

                if (!src || !type) continue;

                //number为1、5、9的tile有多种图片，随机挑一张图来渲染
                //i%2和j%2仅仅是为了让随机的个数少一点，这样就保留更多的纯色砖块，地面看出来不会太突兀
                let num = src;
                if (src === 1 || src === 5 || src === 9) {
                    if (i % 2 === 0 && j % 2 === 1) {
                        num += math.randomRangeInt(0, 4);
                    }
                }

                const imgSrc = `tile (${num})`;
                const sp = spriteFrames.find((v) => v.name === imgSrc) || spriteFrames[0];
                const tileNode = NodeUtil.createUINode(`tile_${i}_${j}`);
                tileNode.parent = map;
                let tileComp = tileNode.addComponent(TileMapView);
                tileComp.init({ i, j, type, sp });

                /** 地图格类型记录 */
                if (!dataInst.tileBlockState[i * row + j]) {
                    if (type === TILE_TYPE.FLOOR) {
                        dataInst.tileBlockState[i * row + j] = TILE_BLOCK_TYPE.FLOOR;
                    } else {
                        dataInst.tileBlockState[i * row + j] = TILE_BLOCK_TYPE.ROAD_BLOCK;
                    }
                }
            }
        }

        this.resetMapPos(mapInfo.length, mapInfo[0].length);
    }

    /** 重置地图位置 */
    resetMapPos(row: number, col: number) {
        const offsetX = (TILE_WIDTH * row) / 2;
        const offsetY = (TILE_HEIGHT * col) / 2 + 80;
        this._stage.setPosition(-offsetX, offsetY);
        this._stage.getComponent(Shake)?.stop();
    }

    /** 创建主角 */
    async createPlayer(data: IEntity) {
        const player = NodeUtil.createUINode("player");
        player.parent = this._stage;
        const playerComp = player.addComponent(Player);
        playerComp.init(data);
        DataManager.instance.player = playerComp;
    }

    /** 创建敌人 */
    async createEnemies(datas: IEntity[]) {
        const dataInst = DataManager.instance;
        datas.forEach((data: IEntity, idx: number) => {
            const enemy = NodeUtil.createUINode(`enemy_${idx + 1}`);
            enemy.parent = this._stage;
            const enemyComp = enemy.addComponent(Enemy);
            enemyComp.init(data);
            dataInst.enemies.push(enemyComp);
            dataInst.tileBlockState[dataInst.row * data.x + data.y] = TILE_BLOCK_TYPE.ENEMY;
        })
    }

    /** 创建门 */
    async createDoor(data: IEntity) {
        const door = NodeUtil.createUINode("door");
        door.parent = this._stage;
        const doorComp = door.addComponent(Door);
        doorComp.init(data);
        DataManager.instance.tileBlockState[DataManager.instance.row * data.x + data.y] = TILE_BLOCK_TYPE.DOOR;
        DataManager.instance.door = doorComp;
    }
    //#endRegion

    //#region
    undo() {
        const dst = DataManager.instance;
        const data = dst.records.pop();
        if (!data) return console.log("无法回退");

        dst.player.x = dst.player.targetX = data.player.x;
        dst.player.y = dst.player.targetY = data.player.y;
        dst.player.updateDirAndState(data.player.direction, data.player.state);

        data.enemies.forEach((enemy, idx) => {
            dst.enemies[idx].x = enemy.x;
            dst.enemies[idx].y = enemy.y;
            dst.enemies[idx].updateDirAndState(enemy.direction, enemy.state);
        });

        dst.door.x = data.door.x;
        dst.door.y = data.door.y;
        dst.door.updateDirAndState(data.door.direction, data.door.state);
    }

    restart() {
        this.buildLevel();
    }

    out() {

    }

    recordStep() {
        const dst = DataManager.instance;
        const item: IRecord = {} as IRecord;
        item.player = {
            x: dst.player.targetX,
            y: dst.player.targetY,
            state: (dst.player.state === ENTITY_BEHAVIOR.IDLE || dst.player.state === ENTITY_BEHAVIOR.DEATH || dst.player.state === ENTITY_BEHAVIOR.AIR_DEATH) ? dst.player.state : ENTITY_BEHAVIOR.IDLE,
            direction: dst.player.direction,
            type: ENTITY_TYPE.PLAYER
        };

        item.enemies = [];
        dst.enemies.forEach(({ x, y, direction, state, type }) => {
            item.enemies.push({ x, y, state, direction, type })
        });

        let door = DataManager.instance.door;
        item.door = {
            x: door.x,
            y: door.y,
            direction: door.state === ENTITY_BEHAVIOR.DEATH ? MOVE_DIRECTION.NONE : door.direction,
            state: door.state,
            type: door.type
        };
        dst.records.push(item);
    }
    //#endRegion
}


