import { ENTITY_BEHAVIOR, ENTITY_TYPE, MOVE_DIRECTION, TILE_TYPE } from "../../scripts/enum/GameEnum";
import level1 from "./level1";
import level2 from "./level2";
import level3 from "./level3";
import level4 from "./level4";
import level5 from "./level5";
import level6 from "./level6";
import level7 from "./level7";
import level8 from "./level8";

/** 地图数据配置 */
export interface ITile {
    src: number;
    type: TILE_TYPE;
}


/** 场景角色初始化配置 */
export interface IEntity {
    x: number;
    y: number;
    direction: MOVE_DIRECTION;
    state: ENTITY_BEHAVIOR;
    type: ENTITY_TYPE;
}

export interface ILevel {
    mapInfo: Array<Array<ITile>>;
    player: IEntity;
    enemies: IEntity[];
    door: IEntity;
}

export const levels: Record<string, ILevel> = {
    level1,
    level2,
    level3,
    level4,
    level5,
    level6,
    level7,
    level8
}