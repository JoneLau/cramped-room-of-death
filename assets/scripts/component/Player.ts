import { _decorator, Animation, EPSILON } from 'cc';
import { IEntity } from '../../configs/levels';
import { globalEvent, TILE_HEIGHT, TILE_WIDTH } from '../base/DataConfig';
import { CONTROLLER_STATE, ENTITY_BEHAVIOR, GAME_EVENT, MOVE_DIRECTION, TILE_BLOCK_TYPE } from '../enum/GameEnum';
import { DataManager } from '../manager/DataManager';
import { Entity } from './Entity';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Entity {
    private readonly speed = 1 / 10;
    private isMoving = false;
    targetX = 0;
    targetY = 0;

    onLoad(): void {
        super.onLoad();
        this._animState.on(Animation.EventType.FINISHED, () => {
            if (this.state !== ENTITY_BEHAVIOR.DEATH && this.state !== ENTITY_BEHAVIOR.AIR_DEATH) {
                this.state = ENTITY_BEHAVIOR.IDLE;
            }
        }, this)
    }

    init(data: IEntity) {
        this.entityName = "player";
        super.init(data);
        this.targetX = this.x;
        this.targetY = this.y;
    }

    start() {
        globalEvent.on(GAME_EVENT.PLAYER_CTRL, this.inputProcess, this);
        globalEvent.on(GAME_EVENT.ATTACK_PLAYER, this.dead, this);
    }

    onDestroy() {
        globalEvent.off(GAME_EVENT.PLAYER_CTRL, this.inputProcess, this);
        globalEvent.off(GAME_EVENT.ATTACK_PLAYER, this.dead, this);
    }

    update(dt?: number): void {
        this.updatePos();
        this.node.setPosition((this.x - 1.5) * TILE_WIDTH, (-this.y + 1.5) * TILE_HEIGHT);
    }

    /** 更新角色位置 */
    updatePos() {
        this.x += Math.sign(this.targetX - this.x) * this.speed;
        this.y += Math.sign(this.targetY - this.y) * this.speed;

        if (Math.abs(this.x - this.targetX) <= EPSILON && Math.abs(this.y - this.targetY) <= EPSILON && this.isMoving) {
            this.x = this.targetX;
            this.y = this.targetY;
            this.isMoving = false;
            globalEvent.emit(GAME_EVENT.PLAYER_MOVE_END);
        }
    }

    /** 移动操作处理 */
    inputProcess(ctrl: CONTROLLER_STATE) {
        if (this.isMoving) return;
        if (this.state === ENTITY_BEHAVIOR.DEATH ||
            this.state === ENTITY_BEHAVIOR.AIR_DEATH ||
            this.state === ENTITY_BEHAVIOR.ATTACK
        ) return;

        const attackTarget = this.getAttackTarget(ctrl);
        if (attackTarget) {
            this.state = ENTITY_BEHAVIOR.ATTACK;
            globalEvent.emit(GAME_EVENT.RECORD_STEP);
            globalEvent.emit(GAME_EVENT.ATTACK_ENEMY, attackTarget);
            return;
        }

        const blockDir = this.getBlockDir(ctrl);
        //非可行走格
        if (blockDir !== MOVE_DIRECTION.NONE) {
            globalEvent.emit(GAME_EVENT.SCREEN_SHAKE, blockDir);
            return;
        }

        this.move(ctrl);
    }

    /** 获取移动位置攻击目标 */
    getAttackTarget(dir: CONTROLLER_STATE) {
        const enemies = DataManager.instance.enemies;
        for (const enemy of enemies) {
            if (enemy.state === ENTITY_BEHAVIOR.DEATH) continue;
            if (dir === CONTROLLER_STATE.TOP && this.direction === MOVE_DIRECTION.TOP && this.x === enemy.x && enemy.y === this.y - 2) {
                return enemy;
            } else if (dir === CONTROLLER_STATE.BOTTOM && this.direction === MOVE_DIRECTION.BOTTOM && this.x === enemy.x && enemy.y === this.y + 2) {
                return enemy;
            } else if (dir === CONTROLLER_STATE.LEFT && this.direction === MOVE_DIRECTION.LEFT && enemy.x === this.x - 2 && enemy.y === this.y) {
                return enemy;
            } else if (dir === CONTROLLER_STATE.RIGHT && this.direction === MOVE_DIRECTION.RIGHT && enemy.x === this.x + 2 && enemy.y === this.y) {
                return enemy;
            }
        }

        return null;
    }

    /** 获得障碍方向 */
    getBlockDir(dir: CONTROLLER_STATE) {
        let weaponX = this.x;
        let weaponY = this.y;
        let nextX = this.x;
        let nextY = this.y;
        let blockDir = MOVE_DIRECTION.NONE;

        if (this.direction === MOVE_DIRECTION.TOP) {
            weaponY -= 1;
        } else if (this.direction === MOVE_DIRECTION.BOTTOM) {
            weaponY += 1;
        } else if (this.direction === MOVE_DIRECTION.LEFT) {
            weaponX -= 1;
        } else if (this.direction === MOVE_DIRECTION.RIGHT) {
            weaponX += 1;
        }

        if (dir === CONTROLLER_STATE.TOP) {
            nextY -= 1;
            weaponY -= 1;
            blockDir = MOVE_DIRECTION.TOP;
        } else if (dir === CONTROLLER_STATE.BOTTOM) {
            nextY += 1;
            weaponY += 1;
            blockDir = MOVE_DIRECTION.BOTTOM;
        } else if (dir === CONTROLLER_STATE.LEFT) {
            nextX -= 1;
            weaponX -= 1;
            blockDir = MOVE_DIRECTION.LEFT;
        } else if (dir === CONTROLLER_STATE.RIGHT) {
            nextX += 1;
            weaponX += 1;
            blockDir = MOVE_DIRECTION.RIGHT;
        } else if (dir === CONTROLLER_STATE.TURN_LEFT) {
            if (this.direction === MOVE_DIRECTION.TOP) {
                //left
                nextX -= 1;
                nextY -= 1;
                weaponY += 1;
                weaponX -= 1;
                blockDir = MOVE_DIRECTION.LEFT;
            } else if (this.direction === MOVE_DIRECTION.BOTTOM) {
                //right
                nextX += 1;
                nextY += 1;
                weaponY -= 1;
                weaponX += 1;
                blockDir = MOVE_DIRECTION.RIGHT;
            } else if (this.direction === MOVE_DIRECTION.LEFT) {
                //bottom
                nextX -= 1;
                nextY += 1;
                weaponY += 1;
                weaponX += 1;
                blockDir = MOVE_DIRECTION.BOTTOM;
            } else if (this.direction === MOVE_DIRECTION.RIGHT) {
                //top
                nextX += 1;
                nextY -= 1;
                weaponY -= 1;
                weaponX -= 1;
                blockDir = MOVE_DIRECTION.TOP;
            }
        } else if (dir === CONTROLLER_STATE.TURN_RIGHT) {
            if (this.direction === MOVE_DIRECTION.TOP) {
                //right
                nextX += 1;
                nextY -= 1;
                weaponY += 1;
                weaponX += 1;
                blockDir = MOVE_DIRECTION.RIGHT;
            } else if (this.direction === MOVE_DIRECTION.BOTTOM) {
                //left
                nextX -= 1;
                nextY += 1;
                weaponY -= 1;
                weaponX -= 1;
                blockDir = MOVE_DIRECTION.LEFT;
            } else if (this.direction === MOVE_DIRECTION.LEFT) {
                //top
                nextX -= 1;
                nextY -= 1;
                weaponY -= 1;
                weaponX += 1;
                blockDir = MOVE_DIRECTION.TOP;
            } else if (this.direction === MOVE_DIRECTION.RIGHT) {
                //bottom
                nextX += 1;
                nextY += 1;
                weaponY += 1;
                weaponX -= 1;
                blockDir = MOVE_DIRECTION.BOTTOM;
            }
        }

        const row = DataManager.instance.row;
        const col = DataManager.instance.col;
        const nextTileInfo = DataManager.instance.tileBlockState[DataManager.instance.row * nextX + nextY];
        if (nextTileInfo === TILE_BLOCK_TYPE.DOOR && DataManager.instance.door.state === ENTITY_BEHAVIOR.DEATH) {
            globalEvent.emit(GAME_EVENT.NEXT_LEVEL);
            return MOVE_DIRECTION.NONE;
        }

        if (nextX < 0 || nextY < 0 || nextX >= col || nextY >= row) return blockDir;


        const nextWeaponTileInfo = DataManager.instance.tileBlockState[DataManager.instance.row * weaponX + weaponY];
        if (nextTileInfo !== TILE_BLOCK_TYPE.FLOOR || (nextWeaponTileInfo !== TILE_BLOCK_TYPE.FLOOR && nextWeaponTileInfo !== TILE_BLOCK_TYPE.DOOR)) return blockDir;
        return MOVE_DIRECTION.NONE;
    }

    move(dir: CONTROLLER_STATE) {
        globalEvent.emit(GAME_EVENT.RECORD_STEP);
        if (dir === CONTROLLER_STATE.TOP) {
            this.targetY -= 1;
            this.isMoving = true;
        } else if (dir === CONTROLLER_STATE.BOTTOM) {
            this.targetY += 1;
            this.isMoving = true;
        } else if (dir === CONTROLLER_STATE.LEFT) {
            this.targetX -= 1;
            this.isMoving = true;
        } else if (dir === CONTROLLER_STATE.RIGHT) {
            this.targetX += 1;
            this.isMoving = true;
        } else if (dir === CONTROLLER_STATE.TURN_LEFT) {
            if (this.direction === MOVE_DIRECTION.TOP) {
                this.updateDirAndState(MOVE_DIRECTION.LEFT, ENTITY_BEHAVIOR.TURN_LEFT);
            } else if (this.direction === MOVE_DIRECTION.BOTTOM) {
                this.updateDirAndState(MOVE_DIRECTION.RIGHT, ENTITY_BEHAVIOR.TURN_LEFT);
            } else if (this.direction === MOVE_DIRECTION.LEFT) {
                this.updateDirAndState(MOVE_DIRECTION.BOTTOM, ENTITY_BEHAVIOR.TURN_LEFT);
            } else if (this.direction === MOVE_DIRECTION.RIGHT) {
                this.updateDirAndState(MOVE_DIRECTION.TOP, ENTITY_BEHAVIOR.TURN_LEFT);
            }
        } else if (dir === CONTROLLER_STATE.TURN_RIGHT) {
            if (this.direction === MOVE_DIRECTION.TOP) {
                this.updateDirAndState(MOVE_DIRECTION.RIGHT, ENTITY_BEHAVIOR.TURN_RIGHT);
            } else if (this.direction === MOVE_DIRECTION.BOTTOM) {
                this.updateDirAndState(MOVE_DIRECTION.LEFT, ENTITY_BEHAVIOR.TURN_RIGHT);
            } else if (this.direction === MOVE_DIRECTION.LEFT) {
                this.updateDirAndState(MOVE_DIRECTION.TOP, ENTITY_BEHAVIOR.TURN_RIGHT);
            } else if (this.direction === MOVE_DIRECTION.RIGHT) {
                this.updateDirAndState(MOVE_DIRECTION.BOTTOM, ENTITY_BEHAVIOR.TURN_RIGHT);
            }
        }
    }

    /** 被攻击 */
    dead() {
        if (this.state === ENTITY_BEHAVIOR.DEATH) return;
        this.state = ENTITY_BEHAVIOR.DEATH;
    }
}


