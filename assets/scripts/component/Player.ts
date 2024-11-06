import { _decorator, Animation, AnimationClip } from 'cc';
import { IEntity } from '../../configs/levels';
import { ResourceManager } from '../manager/ResourceManager';
import { Entity } from './Entity';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Entity {
    private animState: Animation;
    private animClip: AnimationClip;

    init(data: IEntity) {
        super.init(data);

        const anim = this.addComponent(Animation);
        const animationClip = this.animClip = new AnimationClip();
        anim.addClip(animationClip);
    }

    async changeAnimState(name: string) {
        const res = await ResourceManager.instance.loadPlayerAnim(name, this.data.direction);
        this.animClip.duration = 0.5;
        this.animClip.wrapMode = AnimationClip.WrapMode.Loop;
        let track = this.animClip.getTrack(0);
        if (!track) {
            // track = new animation.ObjectTrack();
            // track.path = new animation.TrackPath().toComponent(`Sprite`).toProperty(`SpriteFrame`);
            // this.animClip.addTrack()
        }

    }

}


