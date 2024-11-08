import { _decorator, Animation, animation, AnimationClip, Component, Sprite, SpriteFrame, UITransform } from 'cc';
import { IEntity } from '../../configs/levels';
import { behavior_state_cfg, TILE_HEIGHT, TILE_WIDTH } from '../base/DataConfig';
import { ENTITY_BEHAVIOR, MOVE_DIRECTION } from '../enum/GameEnum';
import { ResourceManager } from '../manager/ResourceManager';
import { sortSpriteFrame } from '../utils/Util';
const { ccclass, property } = _decorator;

const ANIMATION_SPEED = 8;

@ccclass('Entity')
export class Entity extends Component {
    x = 0;
    y = 0;
    protected entityName = "woodenskeleton";

    get state() {
        return this._state;
    }

    set state(value: ENTITY_BEHAVIOR) {
        if (this._state === value) return;
        this._state = value;
        this.changeAnimState();
    }

    get direction() {
        return this._direction;
    }

    set direction(value: MOVE_DIRECTION) {
        if (this._direction === value) return;
        this._direction = value;
        this.changeAnimState();
    }

    protected _animState: Animation;
    protected _animClip: AnimationClip;
    private _direction = MOVE_DIRECTION.TOP;
    private _state = ENTITY_BEHAVIOR.IDLE;

    onLoad() {
        this._animState = this.addComponent(Animation);
        this._animClip = new AnimationClip();
    }

    init(data: IEntity) {
        const sprite = this.addComponent(Sprite);
        sprite.sizeMode = Sprite.SizeMode.CUSTOM;
        const transform = this.getComponent(UITransform);
        transform.setContentSize(TILE_WIDTH * 4, TILE_HEIGHT * 4);
        this.x = data.x;
        this.y = data.y;
        this._direction = data.direction;
        this._state = data.state;
        this.changeAnimState();
        this.node.setPosition((this.x - 1.5) * TILE_WIDTH, (-this.y + 1.5) * TILE_HEIGHT);
    }

    /** 更新动画状态 */
    async changeAnimState() {
        this._animState.stop();
        this._animState.removeClip(this._animClip, true);
        const res = await ResourceManager.instance.loadPlayerAnim(this._state, this.entityName, this.direction);
        if (!res || !res.length) return console.error("Resource loss", this.entityName + " " + this._state + "  " + this._direction);
        sortSpriteFrame(res);
        const animClip = this._animClip;
        let defaultTrack = animClip.getTrack(0) as animation.ObjectTrack<SpriteFrame>;
        let track = defaultTrack || new animation.ObjectTrack<SpriteFrame>();
        !defaultTrack && (track.path = new animation.TrackPath().toComponent(Sprite).toProperty(`spriteFrame`));
        const keyFrameCount = res.length;
        const sample = animClip.sample;
        track.channel.curve.clear();
        let keyStart = 0;
        for (let i = 0; i < keyFrameCount; i++) {
            track.channel.curve.addKeyFrame(keyStart / sample, res[i]);
            keyStart += ANIMATION_SPEED;
        }

        !defaultTrack && animClip.addTrack(track);
        console.log(behavior_state_cfg[this._state])
        animClip.wrapMode = behavior_state_cfg[this._state];
        animClip.duration = keyFrameCount / ANIMATION_SPEED;
        this._animState.defaultClip = this._animClip;
        this._animState.play();
    }

    updateDirAndState(dir: MOVE_DIRECTION, state: ENTITY_BEHAVIOR) {
        this._direction = dir;
        this._state = state;
        this.changeAnimState();
    }
}


