import { IEntity, ILevel } from ".";
import { ENTITY_BEHAVIOR, ENTITY_TYPE, MOVE_DIRECTION, TILE_TYPE } from "../../scripts/enum/GameEnum";


const mapInfo = [
  [
    {
      src: null,
      type: null,
    },
    {
      src: null,
      type: null,
    },
    {
      src: null,
      type: null,
    },
    {
      src: null,
      type: null,
    },
    {
      src: null,
      type: null,
    },
    {
      src: null,
      type: null,
    },
    {
      src: null,
      type: null,
    },
    {
      src: 20,
      type: TILE_TYPE.WALL_LEFT_BOTTOM,
    },
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 20,
      type: TILE_TYPE.WALL_LEFT_BOTTOM,
    },
    {
      src: 18,
      type: TILE_TYPE.CLIFF_LEFT,
    },
    {
      src: null,
      type: null,
    },
  ],
  [
    {
      src: null,
      type: null,
    },
    {
      src: null,
      type: null,
    },
    {
      src: null,
      type: null,
    },
    {
      src: null,
      type: null,
    },
    {
      src: null,
      type: null,
    },
    {
      src: null,
      type: null,
    },
    {
      src: null,
      type: null,
    },
    {
      src: 9,
      type: TILE_TYPE.WALL_ROW,
    },
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 9,
      type: TILE_TYPE.WALL_ROW,
    },
    {
      src: 17,
      type: TILE_TYPE.CLIFF_CENTER,
    },
    {
      src: null,
      type: null,
    },
  ],
  [
    {
      src: null,
      type: null,
    },
    {
      src: null,
      type: null,
    },
    {
      src: null,
      type: null,
    },
    {
      src: null,
      type: null,
    },
    {
      src: null,
      type: null,
    },
    {
      src: null,
      type: null,
    },
    {
      src: null,
      type: null,
    },
    {
      src: 9,
      type: TILE_TYPE.WALL_ROW,
    },
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 15,
      type: TILE_TYPE.WALL_RIGHT_TOP,
    },
    {
      src: 13,
      type: TILE_TYPE.WALL_LEFT_BOTTOM,
    },
    {
      src: 17,
      type: TILE_TYPE.CLIFF_CENTER,
    },
  ],
  [
    {
      src: null,
      type: null,
    },
    {
      src: null,
      type: null,
    },
    {
      src: null,
      type: null,
    },
    {
      src: null,
      type: null,
    },
    {
      src: null,
      type: null,
    },
    {
      src: null,
      type: null,
    },
    {
      src: null,
      type: null,
    },
    {
      src: 9,
      type: TILE_TYPE.WALL_ROW,
    },
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 9,
      type: TILE_TYPE.WALL_ROW,
    },
    {
      src: 17,
      type: TILE_TYPE.CLIFF_CENTER,
    },
  ],
  [
    {
      src: null,
      type: null,
    },
    {
      src: null,
      type: null,
    },
    {
      src: null,
      type: null,
    },
    {
      src: null,
      type: null,
    },
    {
      src: null,
      type: null,
    },
    {
      src: null,
      type: null,
    },
    {
      src: null,
      type: null,
    },
    {
      src: 9,
      type: TILE_TYPE.WALL_ROW,
    },
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 9,
      type: TILE_TYPE.WALL_ROW,
    },
    {
      src: 17,
      type: TILE_TYPE.CLIFF_CENTER,
    },
  ],
  [
    {
      src: 22,
      type: TILE_TYPE.WALL_COLUMN,
    },
    {
      src: 5,
      type: TILE_TYPE.WALL_COLUMN,
    },
    {
      src: 5,
      type: TILE_TYPE.WALL_COLUMN,
    },
    {
      src: 5,
      type: TILE_TYPE.WALL_COLUMN,
    },
    {
      src: 5,
      type: TILE_TYPE.WALL_COLUMN,
    },
    {
      src: 5,
      type: TILE_TYPE.WALL_COLUMN,
    },
    {
      src: 5,
      type: TILE_TYPE.WALL_COLUMN,
    },
    {
      src: 14,
      type: TILE_TYPE.WALL_RIGHT_BOTTOM,
    },
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 9,
      type: TILE_TYPE.WALL_ROW,
    },
    {
      src: 17,
      type: TILE_TYPE.CLIFF_CENTER,
    },
  ],
  [
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 9,
      type: TILE_TYPE.WALL_ROW,
    },
    {
      src: 17,
      type: TILE_TYPE.CLIFF_CENTER,
    },
  ],
  [
    {
      src: 22,
      type: TILE_TYPE.WALL_COLUMN,
    },
    {
      src: 13,
      type: TILE_TYPE.WALL_LEFT_BOTTOM,
    },
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 9,
      type: TILE_TYPE.WALL_ROW,
    },
    {
      src: 17,
      type: TILE_TYPE.CLIFF_CENTER,
    },
  ],
  [
    {
      src: null,
      type: null,
    },
    {
      src: 15,
      type: TILE_TYPE.WALL_RIGHT_TOP,
    },
    {
      src: 5,
      type: TILE_TYPE.WALL_COLUMN,
    },
    {
      src: 5,
      type: TILE_TYPE.WALL_COLUMN,
    },
    {
      src: 5,
      type: TILE_TYPE.WALL_COLUMN,
    },
    {
      src: 5,
      type: TILE_TYPE.WALL_COLUMN,
    },
    {
      src: 5,
      type: TILE_TYPE.WALL_COLUMN,
    },
    {
      src: 5,
      type: TILE_TYPE.WALL_COLUMN,
    },
    {
      src: 5,
      type: TILE_TYPE.WALL_COLUMN,
    },
    {
      src: 5,
      type: TILE_TYPE.WALL_COLUMN,
    },
    {
      src: 14,
      type: TILE_TYPE.WALL_RIGHT_BOTTOM,
    },
    {
      src: 19,
      type: TILE_TYPE.CLIFF_RIGHT,
    },
  ],
];

const player: IEntity = {
  x: 0,
  y: 8,
  direction: MOVE_DIRECTION.RIGHT,
  state: ENTITY_BEHAVIOR.IDLE,
  type: ENTITY_TYPE.PLAYER,
};

const enemies: Array<IEntity> = [
  {
    x: 6,
    y: 7,
    direction: MOVE_DIRECTION.TOP,
    state: ENTITY_BEHAVIOR.IDLE,
    type: ENTITY_TYPE.SKELETON_WOODEN,
  },
];

// const spikes: Array<ISpikes> = [
//   {
//     x: 4,
//     y: 8,
//     type: ENTITY_TYPE.SPIKES_ONE,
//     count: 0,
//   },
//   {
//     x: 4,
//     y: 9,
//     type: ENTITY_TYPE.SPIKES_ONE,
//     count: 0,
//   },
//   {
//     x: 6,
//     y: 3,
//     type: ENTITY_TYPE.SPIKES_ONE,
//     count: 0,
//   },
//   {
//     x: 7,
//     y: 3,
//     type: ENTITY_TYPE.SPIKES_ONE,
//     count: 0,
//   },
//   {
//     x: 6,
//     y: 5,
//     type: ENTITY_TYPE.SPIKES_ONE,
//     count: 0,
//   },
//   {
//     x: 7,
//     y: 5,
//     type: ENTITY_TYPE.SPIKES_ONE,
//     count: 0,
//   },
//   // {
//   // 	x: 4,
//   // 	y: 6,
//   // 	type: ENTITY_TYPE.SPIKES_THREE,
//   // 	count: 0
//   // },
//   // {
//   // 	x: 3,
//   // 	y: 6,
//   // 	type: ENTITY_TYPE.SPIKES_FOUR,
//   // 	count: 0
//   // }
// ];

// const bursts: Array<IEntity> = [];

const door: IEntity = {
  x: 6,
  y: 0,
  direction: MOVE_DIRECTION.BOTTOM,
  state: ENTITY_BEHAVIOR.IDLE,
  type: ENTITY_TYPE.DOOR,
};

const level: ILevel = {
  mapInfo,
  player,
  enemies,
  // spikes,
  // bursts,
  door,
};

export default level;
