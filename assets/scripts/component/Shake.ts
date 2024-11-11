import { _decorator, Component, v3 } from 'cc';
import { globalEvent } from '../base/DataConfig';
import { GAME_EVENT, MOVE_DIRECTION } from '../enum/GameEnum';
const { ccclass, property } = _decorator;

@ccclass('Shake')
export class Shake extends Component {

    isShaking = false;
    shakingDir = MOVE_DIRECTION.TOP;
    shakingTime = 0;
    originPos = v3();

    start() {
        globalEvent.on(GAME_EVENT.SCREEN_SHAKE, this.screenShake, this);
    }

    onDestroy() {
        globalEvent.off(GAME_EVENT.SCREEN_SHAKE, this.screenShake, this);
    }

    screenShake(type: MOVE_DIRECTION) {
        if (this.isShaking) return;
        this.isShaking = true;
        this.shakingTime = 0;
        this.originPos.set(this.node.position);
        this.shakingDir = type;
    }

    update(dt?: number) {
        if (!this.isShaking) return;
        const shakeAmount = 1.6;
        const duration = 0.2;
        const frequency = 12;
        const offset = shakeAmount * Math.sin(frequency * Math.PI * this.shakingTime);
        if (this.shakingDir === MOVE_DIRECTION.TOP) {
            this.node.setPosition(this.originPos.x, this.originPos.y - offset);
        } else if (this.shakingDir === MOVE_DIRECTION.BOTTOM) {
            this.node.setPosition(this.originPos.x, this.originPos.y + offset);
        } else if (this.shakingDir === MOVE_DIRECTION.LEFT) {
            this.node.setPosition(this.originPos.x - offset, this.originPos.y);
        } else if (this.shakingDir === MOVE_DIRECTION.RIGHT) {
            this.node.setPosition(this.originPos.x + offset, this.originPos.y);
        }

        this.shakingTime += dt;
        if (this.shakingTime >= duration) this.isShaking = false;
    }

    stop() {
        this.isShaking = false;
    }
}


