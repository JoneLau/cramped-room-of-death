import { _decorator } from 'cc';
import { globalEvent } from '../base/DataConfig';
import { ENTITY_BEHAVIOR, GAME_EVENT, TILE_BLOCK_TYPE } from '../enum/GameEnum';
import { DataManager } from '../manager/DataManager';
import { Entity } from './Entity';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Entity {
    start() {
        globalEvent.on(GAME_EVENT.ATTACK_ENEMY, this.dead, this);
        globalEvent.on(GAME_EVENT.PLAYER_MOVE_END, this.playerMoveEnd, this);
    }

    onDestroy() {
        globalEvent.off(GAME_EVENT.ATTACK_ENEMY, this.dead, this);
        globalEvent.off(GAME_EVENT.PLAYER_MOVE_END, this.playerMoveEnd, this);
    }

    /** 玩家移动结束判断是否在攻击范围内 */
    playerMoveEnd() {
        let { x, y } = DataManager.instance.player;
        //在可攻击范围内
        if (Math.abs(this.x - x) + Math.abs(this.y - y) <= 1) {
            this.state = ENTITY_BEHAVIOR.ATTACK;
            globalEvent.emit(GAME_EVENT.ATTACK_PLAYER);
        }
    }

    /** 被玩家攻击 */
    dead(enemy: Enemy) {
        if (enemy !== this) return;
        this.state = ENTITY_BEHAVIOR.DEATH;
        const dataInst = DataManager.instance;;
        dataInst.tileBlockState[this.x * dataInst.row + this.y] = TILE_BLOCK_TYPE.FLOOR;
        globalEvent.off(GAME_EVENT.PLAYER_MOVE_END, this.playerMoveEnd, this);
    }
}