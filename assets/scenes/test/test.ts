import { _decorator, Animation, animation, AnimationClip, Component, Sprite, SpriteFrame } from 'cc';
import { MOVE_DIRECTION } from '../../scripts/enum/GameEnum';
import { ResourceManager } from '../../scripts/manager/ResourceManager';

const { ccclass, property } = _decorator;

@ccclass('test')
export class test extends Component {
    private anim: Animation;
    private animClip: AnimationClip;

    start() {
        this.anim = this.getComponent(Animation);
        this.animClip = new AnimationClip();
        this.loadAnim("idle");
    }

    changeAnim(name: string) {
        this.loadAnim(name)
    }

    async loadAnim(name: string) {
        this.anim.defaultClip = null;
        const res = await ResourceManager.instance.loadPlayerAnim(name, MOVE_DIRECTION.TOP);
        if (!res || !res.length) return console.error("Resource loss");
        const anim = this.anim;
        anim.stop();
        const animClip = this.animClip;
        const defaultTrack = animClip.getTrack(0) as animation.ObjectTrack<SpriteFrame>;
        const track = defaultTrack || new animation.ObjectTrack<SpriteFrame>();
        !defaultTrack && (track.path = new animation.TrackPath().toComponent(Sprite).toProperty(`spriteFrame`));
        const keyFrameCount = res.length;
        const sample = animClip.sample;
        track.channel.curve.clear();
        let keyStart = 0;
        for (let i = 0; i < keyFrameCount; i++) {
            track.channel.curve.addKeyFrame(keyStart / sample, res[i]);
            keyStart += 7;
        }
        !defaultTrack && (animClip.addTrack(track));
        animClip.duration = keyFrameCount * 7 / sample;
        animClip.wrapMode = AnimationClip.WrapMode.Loop;
        anim.defaultClip = animClip;

        anim.play();
    }

    // async loadAnim(name: string) {
    //     const res = await ResourceManager.instance.loadPlayerAnim(name, MOVE_DIRECTION.TOP);
    //     if (!res || !res.length) return console.error("Resource loss");
    //     const anim = this.getComponent(Animation);
    //     const animClip = new AnimationClip();
    //     const track = new animation.ObjectTrack();
    //     track.path = new animation.TrackPath().toComponent(Sprite).toProperty(`spriteFrame`);
    //     const keyFrameCount = res.length;
    //     const sample = animClip.sample;
    //     let keyStart = 0;
    //     for (let i = 0; i < keyFrameCount; i++) {
    //         track.channel.curve.addKeyFrame(keyStart / sample, res[i]);
    //         keyStart += 7;
    //     }
    //     animClip.addTrack(track);
    //     animClip.duration = keyFrameCount * 7 / sample;
    //     animClip.wrapMode = AnimationClip.WrapMode.Loop;
    //     anim.defaultClip = animClip;

    //     anim.play();
    // }
}