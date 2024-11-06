import { SpriteFrame } from "cc";
import { TILE_TYPE } from "../enum/GameEnum";

/** 地图块数据 */
export interface ITileMapData {
    i: number;
    j: number;
    type: TILE_TYPE;
    sp: SpriteFrame;
}