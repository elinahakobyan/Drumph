export const levels: LevelConfig[] = [
    [
        { row: 2, col: 3, sound: 3 },
        { row: 1, col: 3, sound: 2 },
        { row: 0, col: 3, sound: 1 },
        { row: 1, col: 3, sound: 4 },
        { row: 2, col: 3, sound: 7 },
        { row: 1, col: 3, sound: 6 },
        { row: 0, col: 3, sound: 5 },
        { row: 1, col: 3, sound: 8 },
    ],
    [
        { row: 2, col: 0, sound: 1 },
        { row: 1, col: 0, sound: 1 },
        { row: 0, col: 0, sound: 1 },
        { row: 0, col: 1, sound: 1 },
    ],
    [
        { row: 0, col: 0, sound: 1 },
        { row: 0, col: 1, sound: 1 },
        { row: 0, col: 2, sound: 2 },
        { row: 0, col: 3, sound: 3 },
        { row: 1, col: 0, sound: 4 },
        { row: 1, col: 1, sound: 5 },
        { row: 1, col: 2, sound: 5 },
        { row: 1, col: 3, sound: 6 },
        { row: 2, col: 0, sound: 7 },
        { row: 2, col: 1, sound: 8 },
        { row: 2, col: 2, sound: 9 },
        { row: 2, col: 3, sound: 9 },
    ],
];

export const levelOpenPads = [
    [
        { row: 2, col: 3 },
        { row: 1, col: 3 },
        { row: 0, col: 3 },
    ],
    [
        { row: 2, col: 0 },
        { row: 1, col: 0 },
        { row: 0, col: 0 },
        { row: 0, col: 1 },
    ],
    [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 3 },
        { row: 1, col: 0 },
        { row: 1, col: 3 },
        { row: 2, col: 0 },
        { row: 2, col: 3 },
    ],
];

export enum CellColors {
    color1 = 'color1',
    color2 = 'color2',
    color3 = 'color3',
    color4 = 'color4',
    color5 = 'color5',
}

export const padsConfigs: PadModelConfig[] = [
    { name: 'pad_0_0', row: 0, col: 0, sound: 0, colorPassive: CellColors.color1, colorActive: 0xff0000 },
    { name: 'pad_0_1', row: 0, col: 1, sound: 0, colorPassive: CellColors.color1, colorActive: 0xff0000 },
    { name: 'pad_0_2', row: 0, col: 2, sound: 0, colorPassive: CellColors.color2, colorActive: 0xff0000 },
    { name: 'pad_0_3', row: 0, col: 3, sound: 0, colorPassive: CellColors.color3, colorActive: 0xff0000 },
    { name: 'pad_1_0', row: 1, col: 0, sound: 0, colorPassive: CellColors.color1, colorActive: 0xff0000 },
    { name: 'pad_1_2', row: 1, col: 2, sound: 0, colorPassive: CellColors.color4, colorActive: 0xff0000 },
    { name: 'pad_1_1', row: 1, col: 1, sound: 0, colorPassive: CellColors.color5, colorActive: 0xff0000 },
    { name: 'pad_1_3', row: 1, col: 3, sound: 0, colorPassive: CellColors.color2, colorActive: 0xff0000 },
    { name: 'pad_2_0', row: 2, col: 0, sound: 0, colorPassive: CellColors.color1, colorActive: 0xff0000 },
    { name: 'pad_2_1', row: 2, col: 1, sound: 0, colorPassive: CellColors.color4, colorActive: 0xff0000 },
    { name: 'pad_2_2', row: 2, col: 2, sound: 0, colorPassive: CellColors.color5, colorActive: 0xff0000 },
    { name: 'pad_2_3', row: 2, col: 3, sound: 0, colorPassive: CellColors.color3, colorActive: 0xff0000 },
];

export const cellsGap = 10;
export const levelLength = 3.2;
export const timerDelay = 0.01;

export const logoPaddingY = 0.25;

export const logoPaddingH = 0.26;

export const boardPadding = 0.07;

export const cellSize = Object.freeze({
    width: 210,
    height: 210,
});

export const logoDimension = Object.freeze({
    width: 667,
    height: 222,
});
