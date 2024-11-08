import { AnimationClip, EventTarget } from "cc";

export const TILE_WIDTH = 55;
export const TILE_HEIGHT = 55;
export const behavior_state_cfg = {
    "idle": AnimationClip.WrapMode.Loop,
    "attack": AnimationClip.WrapMode.Normal,
    "turnleft": AnimationClip.WrapMode.Normal,
    "turnright": AnimationClip.WrapMode.Normal,
    "blockfront": AnimationClip.WrapMode.Normal,
    "blockback": AnimationClip.WrapMode.Normal,
    "blockleft": AnimationClip.WrapMode.Normal,
    "blockright": AnimationClip.WrapMode.Normal,
    "blockturnleft": AnimationClip.WrapMode.Normal,
    "blockturnright": AnimationClip.WrapMode.Normal,
    "death": AnimationClip.WrapMode.Normal,
    "airdeath": AnimationClip.WrapMode.Normal,
}

export const globalEvent = new EventTarget();