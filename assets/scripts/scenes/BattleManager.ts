import { _decorator, Button, Component, math, Node } from 'cc';
import { IEntity, ITile, levels } from '../../configs/levels';
import { TILE_HEIGHT, TILE_WIDTH } from '../base/DataConfig';
import { Enemy } from '../component/Enemy';
import { Player } from '../component/Player';
import { TileMapShakeController } from '../component/TileMapShakeController';
import { TileMapView } from '../component/TileMapView';
import { DataManager } from '../manager/DataManager';
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

    onLoad() {
        this.btnTurnLeft.on(Button.EventType.CLICK, this.upLevel, this);
        this.btnTurnRight.on(Button.EventType.CLICK, this.nextLevel, this);
    }

    start() {
        this.createStage();
        this.buildLevel();
    }

    upLevel() {
        this.resetStage();
        DataManager.instance.level--;
        this.buildLevel();
    }

    nextLevel() {
        this.resetStage();
        DataManager.instance.level++;
        this.buildLevel();
    }

    /** 舞台创建 */
    createStage() {
        this._stage = NodeUtil.createUINode("stage");
        this._stage.parent = this.node;
        this._stage.setSiblingIndex(2);
        this._stage.addComponent(TileMapShakeController);
    }

    resetStage() {
        if (!this._stage) return;
        this._stage.destroyAllChildren();
    }

    /** 关卡构建 */
    async buildLevel() {
        const currLevel = levels[`level${DataManager.instance.level}`];
        if (!currLevel) return console.warn("当前关卡数量不够拉~~~~");

        // this.level = currLevel;

        Promise.all([
            this.createTileMap(currLevel.mapInfo),
            this.createPlayer(currLevel.player),
            this.createEnemies(currLevel.enemies),
        ])
    }
    /** 创建地图 */
    async createTileMap(mapInfo: Array<Array<ITile>>) {
        const map = NodeUtil.createUINode("tileMap");
        map.parent = this._stage;
        const spriteFrames = await ResourceManager.instance.loadDir("texture/tile/tile")

        for (let i = 0; i < mapInfo.length; i++) {
            const colDatas = mapInfo[i];
            for (let j = 0; j < colDatas.length; j++) {
                const colData = colDatas[j];
                const { src, type } = colData;
                if (!src || !type) continue;

                //number为1、5、9的tile有多种图片，随机挑一张图来渲染
                //i%2和j%2仅仅是为了让随机的个数少一点，这样就保留更多的纯色砖块，地面看出来不会太突兀
                let num = src;
                if (i % 2 === 0 && j % 2 === 1) {
                    if (src === 1 || src === 5 || src === 9) {
                        num += math.randomRangeInt(0, 4);
                    }
                }

                const imgSrc = `tile (${num})`;
                const sp = spriteFrames.find((v) => v.name === imgSrc) || spriteFrames[0];
                const tileNode = NodeUtil.createUINode(`tile_${i}_${j}`);
                tileNode.parent = map;
                let tileComp = tileNode.addComponent(TileMapView);
                tileComp.init({ i, j, type, sp });
            }
        }

        this.resetMapPos(mapInfo.length, mapInfo[0].length);
    }

    /** 重置地图位置 */
    resetMapPos(row: number, col: number) {
        const offsetX = (TILE_WIDTH * row) / 2;
        const offsetY = (TILE_HEIGHT * col) / 2 + 80;
        this._stage.setPosition(-offsetX, offsetY);
        //shake stop
    }

    /** 创建主角 */
    async createPlayer(data: IEntity) {
        const player = NodeUtil.createUINode("player");
        player.parent = this._stage;
        player.addComponent(Player).init(data);
    }

    /** 创建敌人 */
    async createEnemies(datas: IEntity[]) {
        datas.forEach((data: IEntity, idx: number) => {
            const enemy = NodeUtil.createUINode(`enemy_${idx + 1}`);
            enemy.parent = this._stage;
            enemy.addComponent(Enemy).init(data)
        })
    }
}


