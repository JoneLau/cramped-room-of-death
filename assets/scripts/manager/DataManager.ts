import { Singleton } from "../base/Singleton";

/** 数据管理类 */
export class DataManager extends Singleton {
    static get instance() {
        return super.getInstance<DataManager>();
    }

    level = 1;
}