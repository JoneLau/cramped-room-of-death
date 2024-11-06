import { _decorator, Component, Sprite, UITransform } from 'cc';
import { TILE_HEIGHT, TILE_WIDTH } from '../base/DataConfig';
import { ITileMapData } from '../base/TypeConfig';
import { TILE_TYPE } from '../enum/GameEnum';
const { ccclass, property } = _decorator;

/** 地图块组件 */
@ccclass('TileMapView')
export class TileMapView extends Component {
    type: TILE_TYPE;
    moveable = false; //地图块的移动属性
    turnable = false; //地图块

    init(data: ITileMapData) {
        const { type, sp, i, j } = data;
        this.type = type;
        switch (type) {
            case TILE_TYPE.WALL_LEFT_BOTTOM:
            case TILE_TYPE.WALL_LEFT_TOP:
            case TILE_TYPE.WALL_RIGHT_BOTTOM:
            case TILE_TYPE.WALL_RIGHT_TOP:
            case TILE_TYPE.WALL_ROW:
            case TILE_TYPE.WALL_COLUMN:
                this.moveable = false;
                this.turnable = false;
                break;
            case TILE_TYPE.CLIFF_LEFT:
            case TILE_TYPE.CLIFF_CENTER:
            case TILE_TYPE.CLIFF_RIGHT:
                this.moveable = false;
                this.turnable = true;
                break;
            default:
                this.moveable = true;
                this.turnable = true;
                break;
        }

        const uiTransform = this.getComponent(UITransform);
        const sprite = this.addComponent(Sprite);
        sprite.spriteFrame = sp;
        uiTransform.setContentSize(TILE_WIDTH, TILE_HEIGHT);
        this.node.setPosition(i * TILE_WIDTH, -j * TILE_HEIGHT);
    }
}


