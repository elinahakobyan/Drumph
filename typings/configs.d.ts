type ButtonConfig = {
    input?: ButtonInputConfig;
    states?: ButtonStatesConfig;
};

type ButtonInputConfig = {
    name?: string;
    area?: PIXI.IHitArea;
};

type ButtonStatesConfig = {
    up?: ButtonStateConfig;
    down?: ButtonStateConfig;
    disable?: ButtonStateConfig;
};

type ButtonStateConfig = {
    bg?: SpriteConfig | NineSliceConfig;
    label?: TextConfig;
};

type ButtonState = PIXI.Container;

type ButtonStateKey = 'up' | 'down' | 'disable';

type ButtonStates = {
    up: ButtonState;
    down: ButtonState;
    disable: ButtonState;
};

type SpriteConfig = {
    texture: string;
    x?: number;
    y?: number;
    tint?: number;
    scale?: PIXI.Point;
    anchor?: PIXI.Point;
};

type TextureConfig = string;

type NineSliceConfig = {
    texture: string;
    data: number[];
    width: number;
    height: number;
    x?: number;
    y?: number;
    tint?: number;
    scale?: PIXI.Point;
};

type TextConfig = {
    x?: number;
    y?: number;
    text: string;
    anchor?: PIXI.Point;
    style?: PIXI.TextStyle;
};

type ProgressConfig = {
    pads: string[];
    state: BoardState;
};

type BoardTimer = {
    entryTimer: number;
    start: number;
    end: number;
    pointers?: { padUUid: string; position: number }[];
};

type ParticleConfig = {
    data: import('@armathai/pixi-particles').ParticleEffectConfig;
    x?: number;
    y?: number;
    scale?: PIXI.Point;
};

type AnimationConfig = {
    frames: string[];
    speed?: number;
    loop?: boolean;
    x?: number;
    y?: number;
    scale?: PIXI.Point;
    anchor?: PIXI.Point;
};

type SpineConfig = {
    skeleton: import('pixi-spine').SkeletonData;
    x?: number;
    y?: number;
    scale?: PIXI.Point;
    speed?: number;
};

type LevelPadConfig = {
    row: number;
    col: number;
    sound: number;
};

type PadModelConfig = {
    name: string;
    row: number;
    col: number;
    sound?: number;
    colorPassive?: CellColors;
    colorActive?: number;
};

type LevelConfig = LevelPadConfig[];
