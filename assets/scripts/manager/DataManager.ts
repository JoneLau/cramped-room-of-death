import { ILevel } from "../../configs/levels";
import { Singleton } from "../base/Singleton";
import { Door } from "../component/Door";
import { Enemy } from "../component/Enemy";
import { Player } from "../component/Player";
import { TILE_BLOCK_TYPE } from "../enum/GameEnum";

export type IRecord = Omit<ILevel, "mapInfo">;

/** 数据管理类 */
export class DataManager extends Singleton {
    static get instance() {
        return super.getInstance<DataManager>();
    }

    level = 1;
    enemies: Enemy[] = [];
    player: Player;
    door: Door;
    records: IRecord[] = [];
    tileBlockState: TILE_BLOCK_TYPE[];
    row = 0;
    col = 0;
}