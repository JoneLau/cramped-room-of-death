import { _decorator, Component, Sprite, UITransform } from 'cc';
import { IEntity } from '../../configs/levels';
import { TILE_HEIGHT, TILE_WIDTH } from '../base/DataConfig';
const { ccclass, property } = _decorator;

@ccclass('Entity')
export class Entity extends Component {

    data: IEntity;

    init(data: IEntity) {
        const sprite = this.addComponent(Sprite);
        sprite.sizeMode = Sprite.SizeMode.CUSTOM;
        const transform = this.getComponent(UITransform);
        transform.setContentSize(TILE_WIDTH * 4, TILE_HEIGHT * 4);
        this.data = data;
    }
}


