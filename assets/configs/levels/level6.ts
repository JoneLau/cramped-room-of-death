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
      type: TILE_TYPE.WALL_COLUMN,
    },
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 22,
      type: TILE_TYPE.WALL_COLUMN,
    },
    {
      src: 5,
      type: TILE_TYPE.WALL_COLUMN,
    },
    {
      src: 13,
      type: TILE_TYPE.WALL_LEFT_BOTTOM,
    },
    {
      src: 18,
      type: TILE_TYPE.CLIFF_LEFT,
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
      src: 17,
      type: TILE_TYPE.CLIFF_CENTER,
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
      src: 15,
      type: TILE_TYPE.WALL_RIGHT_TOP,
    },
    {
      src: 5,
      type: TILE_TYPE.WALL_COLUMN,
    },
    {
      src: 23,
      type: TILE_TYPE.WALL_RIGHT_BOTTOM,
    },
    {
      src: 1,
      type: TILE_TYPE.FLOOR,
    },
    {
      src: 22,
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
  y: 3,
  direction: MOVE_DIRECTION.RIGHT,
  state: ENTITY_BEHAVIOR.IDLE,
  type: ENTITY_TYPE.PLAYER,
};

const enemies: Array<IEntity> = [
  {
    x: 5,
    y: 2,
    direction: MOVE_DIRECTION.LEFT,
    state: ENTITY_BEHAVIOR.IDLE,
    type: ENTITY_TYPE.SKELETON_WOODEN,
  },
  {
    x: 5,
    y: 4,
    direction: MOVE_DIRECTION.LEFT,
    state: ENTITY_BEHAVIOR.IDLE,
    type: ENTITY_TYPE.SKELETON_WOODEN,
  },
];

// const spikes: Array<ISpikes> = [];

// const bursts: Array<IEntity> = [];

const door: IEntity = {
  x: 8,
  y: 3,
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
