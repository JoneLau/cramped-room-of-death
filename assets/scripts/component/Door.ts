import { _decorator } from 'cc';
import { IEntity } from '../../configs/levels';
import { TILE_BLOCK_TYPE } from '../enum/GameEnum';
import { DataManager } from '../manager/DataManager';
import { Entity } from './Entity';
const { ccclass, property } = _decorator;

@ccclass('Door')
export class Door extends Entity {


    init(data: IEntity): void {
        this.entityName = "door";
        super.init(data);
    }

    death() {
        const dataInst = DataManager.instance;
        dataInst.tileBlockState[this.x * dataInst.row + this.y] = TILE_BLOCK_TYPE.FLOOR;
    }
}


