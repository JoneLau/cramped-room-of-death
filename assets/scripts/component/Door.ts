import { _decorator } from 'cc';
import { IEntity } from '../../configs/levels';
import { globalEvent } from '../base/DataConfig';
import { ENTITY_BEHAVIOR, GAME_EVENT, MOVE_DIRECTION } from '../enum/GameEnum';
import { DataManager } from '../manager/DataManager';
import { Entity } from './Entity';
const { ccclass, property } = _decorator;

@ccclass('Door')
export class Door extends Entity {

    start() {
        globalEvent.on(GAME_EVENT.ATTACK_ENEMY, this.enemyCheck, this);
    }

    onDestroy() {
        globalEvent.off(GAME_EVENT.ATTACK_ENEMY, this.enemyCheck, this);
    }

    init(data: IEntity) {
        this.entityName = "door";
        super.init(data);
    }

    /** 检查关卡敌人状态 */
    enemyCheck() {
        const dataInst = DataManager.instance;
        for (const enemy of dataInst.enemies) {
            if (enemy.state !== ENTITY_BEHAVIOR.DEATH) return;
        }

        this.updateDirAndState(MOVE_DIRECTION.NONE, ENTITY_BEHAVIOR.DEATH);
        // dataInst.tileBlockState[this.x * dataInst.row + this.y] = TILE_BLOCK_TYPE.FLOOR;
        globalEvent.off(GAME_EVENT.ATTACK_ENEMY, this.enemyCheck, this);
    }
}


