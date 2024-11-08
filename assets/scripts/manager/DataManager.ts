import { Singleton } from "../base/Singleton";
import { Enemy } from "../component/Enemy";
import { Player } from "../component/Player";
import { TILE_BLOCK_TYPE } from "../enum/GameEnum";

/** 数据管理类 */
export class DataManager extends Singleton {
    static get instance() {
        return super.getInstance<DataManager>();
    }

    level = 1;
    enemies: Enemy[] = [];
    player: Player;

    tileBlockState: TILE_BLOCK_TYPE[];
    row = 0;
    col = 0;
}