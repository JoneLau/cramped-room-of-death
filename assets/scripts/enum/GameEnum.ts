/***
 * 全局枚举
 */

/***
 * 地图瓦片枚举
 */
export enum TILE_TYPE {
    WALL_ROW = 'WALL_ROW',                  //墙横向
    WALL_COLUMN = 'WALL_COLUMN',            //墙纵向
    WALL_LEFT_TOP = 'WALL_LEFT_TOP',        //墙左上
    WALL_RIGHT_TOP = 'WALL_RIGHT_TOP',      //墙右上
    WALL_LEFT_BOTTOM = 'WALL_LEFT_BOTTOM',  //墙左下
    WALL_RIGHT_BOTTOM = 'WALL_RIGHT_BOTTOM',//墙右下
    CLIFF_LEFT = 'CLIFF_ROW_START',         //悬崖左边
    CLIFF_CENTER = 'CLIFF_ROW_CENTER',      //悬崖
    CLIFF_RIGHT = 'CLIFF_ROW_END',          //悬崖右边
    FLOOR = 'FLOOR',                        //地面
}

/***
 * 角色方向枚举
 */
export enum MOVE_DIRECTION {
    LEFT = 'left',
    RIGHT = 'right',
    TOP = 'top',
    BOTTOM = 'bottom',
}

/***
* 按钮状态枚举
*/
export enum CONTROLLER_STATE {
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
    TOP = 'TOP',
    BOTTOM = 'BOTTOM',
    TURN_LEFT = 'TURN_LEFT',
    TURN_RIGHT = 'TURN_LEFT',
}

/***
 * 角色动作枚举
 */
export enum ENTITY_BEHAVIOR {
    IDLE = 'IDLE',
    ATTACK = 'ATTACK',
    TURN_LEFT = 'TURN_LEFT',
    TURN_RIGHT = 'TURN_RIGHT',
    BLOCK_FRONT = 'BLOCK_FRONT',
    BLOCK_BACK = 'BLOCK_BACK',
    BLOCK_LEFT = 'BLOCK_LEFT',
    BLOCK_RIGHT = 'BLOCK_RIGHT',
    BLOCK_TURN_LEFT = 'BLOCK_TURN_LEFT',
    BLOCK_TURN_RIGHT = 'BLOCK_TURN_RIGHT',
    DEATH = 'DEATH',
    AIR_DEATH = 'AIR_DEATH',
}

/***
 * 场景角色枚举
 */
export enum ENTITY_TYPE {
    PLAYER = 'PLAYER',                  //主角
    SKELETON_WOODEN = 'SKELETON_WOODEN',
    SKELETON_IRON = 'SKELETON_IRON',
    SPIKES_ONE = 'SPIKES_ONE',
    SPIKES_TWO = 'SPIKES_TWO',
    SPIKES_THREE = 'SPIKES_THREE',
    SPIKES_FOUR = 'SPIKES_FOUR',
    BURST = 'BURST',
    DOOR = 'DOOR',                      //门
    SMOKE = 'SMOKE',
}