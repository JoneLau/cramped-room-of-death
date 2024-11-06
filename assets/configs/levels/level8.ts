import { IEntity, ILevel } from ".";
import { ENTITY_BEHAVIOR, ENTITY_TYPE, MOVE_DIRECTION, TILE_TYPE } from "../../scripts/enum/GameEnum";


const mapInfo = [
  [
    {
      src: 16,
      type: TILE_TYPE.WALL_LEFT_TOP,
    },
    {
      src: 5,
      type: TILE_TYPE.WALL_COLUMN,
    },
    {
      src: 23,
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
  ],
  [
    {
      src: 9,
      type: TILE_TYPE.WALL_ROW,
    },
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 17,
      type: TILE_TYPE.CLIFF_CENTER,
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
      src: 17,
      type: TILE_TYPE.CLIFF_CENTER,
    },
    {
      src: null,
      type: null,
    },
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 17,
      type: TILE_TYPE.CLIFF_CENTER,
    },
  ],
  [
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
  ],
  [
    {
      src: 9,
      type: TILE_TYPE.WALL_ROW,
    },
    {
      src: 17,
      type: TILE_TYPE.CLIFF_CENTER,
    },
    {
      src: 20,
      type: TILE_TYPE.WALL_ROW,
    },
    {
      src: 18,
      type: TILE_TYPE.CLIFF_LEFT,
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
  ],
  [
    {
      src: 9,
      type: TILE_TYPE.WALL_ROW,
    },
    {
      src: 17,
      type: TILE_TYPE.CLIFF_CENTER,
    },
    {
      src: 9,
      type: TILE_TYPE.WALL_ROW,
    },
    {
      src: 18,
      type: TILE_TYPE.CLIFF_LEFT,
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
  ],
  [
    {
      src: 9,
      type: TILE_TYPE.WALL_ROW,
    },
    {
      src: 17,
      type: TILE_TYPE.CLIFF_CENTER,
    },
    {
      src: 21,
      type: TILE_TYPE.WALL_ROW,
    },
    {
      src: 18,
      type: TILE_TYPE.CLIFF_LEFT,
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
  ],
  [
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
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 18,
      type: TILE_TYPE.CLIFF_LEFT,
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
  ],
  [
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
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 18,
      type: TILE_TYPE.CLIFF_LEFT,
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
  ],
  [
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
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 18,
      type: TILE_TYPE.CLIFF_LEFT,
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
  ],
  [
    {
      src: 9,
      type: TILE_TYPE.WALL_ROW,
    },
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 24,
      type: TILE_TYPE.WALL_ROW,
    },
    {
      src: 18,
      type: TILE_TYPE.CLIFF_LEFT,
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
  ],
];

const player: IEntity = {
  x: 1,
  y: 7,
  direction: MOVE_DIRECTION.TOP,
  state: ENTITY_BEHAVIOR.IDLE,
  type: ENTITY_TYPE.PLAYER,
};

const enemies: Array<IEntity> = [
  {
    x: 8,
    y: 1,
    direction: MOVE_DIRECTION.LEFT,
    state: ENTITY_BEHAVIOR.IDLE,
    type: ENTITY_TYPE.SKELETON_WOODEN,
  },
];

// const spikes: Array<ISpikes> = [];

// const bursts: Array<IEntity> = [
//   {
//     x: 1,
//     y: 2,
//     state: ENTITY_BEHAVIOR.IDLE,
//     type: ENTITY_TYPE.BURST,
//     direction: MOVE_DIRECTION.TOP,
//   },
//   {
//     x: 1,
//     y: 5,
//     state: ENTITY_BEHAVIOR.IDLE,
//     type: ENTITY_TYPE.BURST,
//     direction: MOVE_DIRECTION.TOP,
//   },
//   {
//     x: 1,
//     y: 6,
//     state: ENTITY_BEHAVIOR.IDLE,
//     type: ENTITY_TYPE.BURST,
//     direction: MOVE_DIRECTION.TOP,
//   },
//   {
//     x: 2,
//     y: 1,
//     state: ENTITY_BEHAVIOR.IDLE,
//     type: ENTITY_TYPE.BURST,
//     direction: MOVE_DIRECTION.TOP,
//   },
//   {
//     x: 3,
//     y: 1,
//     state: ENTITY_BEHAVIOR.IDLE,
//     type: ENTITY_TYPE.BURST,
//     direction: MOVE_DIRECTION.TOP,
//   },
//   {
//     x: 4,
//     y: 1,
//     state: ENTITY_BEHAVIOR.IDLE,
//     type: ENTITY_TYPE.BURST,
//     direction: MOVE_DIRECTION.TOP,
//   },
//   {
//     x: 5,
//     y: 1,
//     state: ENTITY_BEHAVIOR.IDLE,
//     type: ENTITY_TYPE.BURST,
//     direction: MOVE_DIRECTION.TOP,
//   },
//   {
//     x: 6,
//     y: 1,
//     state: ENTITY_BEHAVIOR.IDLE,
//     type: ENTITY_TYPE.BURST,
//     direction: MOVE_DIRECTION.TOP,
//   },
//   {
//     x: 6,
//     y: 2,
//     state: ENTITY_BEHAVIOR.IDLE,
//     type: ENTITY_TYPE.BURST,
//     direction: MOVE_DIRECTION.TOP,
//   },
// ];

const door: IEntity = {
  x: 9,
  y: 1,
  direction: MOVE_DIRECTION.LEFT,
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
