/**
 * 全局枚举
 */

/**
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

/**
 * 瓦片占用类型
 */
export enum TILE_BLOCK_TYPE {
    FLOOR = "FLOOR",                //行走格
    ROAD_BLOCK = "ROAD_BLOCK",      //不可通行格
    BURST = "BURST",                //地陷
    ENEMY = "ENEMY",                //敌人
    DOOR = "DOOR"                   //门
}

/**
 * 角色方向枚举
 */
export enum MOVE_DIRECTION {
    NONE = "none",
    LEFT = 'left',
    RIGHT = 'right',
    TOP = 'top',
    BOTTOM = 'bottom',
}

/**
* 按钮状态枚举
*/
export enum CONTROLLER_STATE {
    LEFT = 'left',
    RIGHT = 'right',
    TOP = 'top',
    BOTTOM = 'bottom',
    TURN_LEFT = 'turn_left',
    TURN_RIGHT = 'turn_right',
}

/**
 * 角色动作枚举
 */
export enum ENTITY_BEHAVIOR {
    IDLE = 'idle',
    ATTACK = 'attack',
    TURN_LEFT = 'turnleft',
    TURN_RIGHT = 'turnright',
    BLOCK_FRONT = 'blockfront',
    BLOCK_BACK = 'blockback',
    BLOCK_LEFT = 'blockleft',
    BLOCK_RIGHT = 'blockright',
    BLOCK_TURN_LEFT = 'blockturnleft',
    BLOCK_TURN_RIGHT = 'blockturnright',
    DEATH = 'death',
    AIR_DEATH = 'airdeath',
}

/**
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

/**
 * 游戏事件
 */
export enum GAME_EVENT {
    PLAYER_CTRL = 'player_ctrl',
    ATTACK_ENEMY = 'attack_enemy',
    ATTACK_PLAYER = 'attack_player',
    OPEN_DOOR = 'open_door',
    PLAYER_MOVE_END = 'player_move_end',
    SCREEN_SHAKE = 'screen_shake',               //震屏事件
    NEXT_LEVEL = 'next_level',                   //进入下一关
    RECORD_STEP = 'record_step',                 //步骤记录
}