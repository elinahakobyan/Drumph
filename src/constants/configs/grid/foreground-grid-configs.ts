import { CellAlign, ICellConfig } from '@armathai/pixi-grid';
import { getPlayable, isSquareLikeScreen } from '../../../utils';
import { boardPadding, cellsGap, cellSize } from '../../constants';

export const getForegroundGridLandscapeConfig = (): ICellConfig => {
    const logoH = isSquareLikeScreen() ? 0.26 : 0.16;
    const progressBarH = isSquareLikeScreen() ? 0.04 : 0.04;
    const { width: viewWidth, height: viewHeight } = getPlayable().viewBounds;
    const { width: cellOriginalWidth, height: cellOriginalHeight } = cellSize;

    const boardHeight = 3 * cellOriginalHeight + 2 * cellsGap;
    const boardWidth = 4 * cellOriginalWidth + 3 * cellsGap;
    const boardH = 1 - logoH - boardPadding;
    const boardScale = (boardH * viewHeight) / boardHeight;
    const boardW = (boardWidth * boardScale) / viewWidth;

    return {
        name: 'foreground',
        // debug: { color: 0xd95027 },
        cells: [
            {
                name: 'logo',
                bounds: { x: (1 - boardW) / 2, y: 0, width: boardW, height: logoH },
                padding: { y: 0.2, height: 0.7 },
                align: CellAlign.rightTop,
            },
            {
                name: 'sound',
                bounds: { x: 0, y: 0, height: 0.3, width: (1 - boardW) / 2 },
                padding: { y: 0.2, width: 0.7, x: 0.2 },
                align: CellAlign.leftCenter,
            },
            {
                // debug: { color: 0xd95027 },
                name: 'tutorial',
                bounds: {
                    x: (1 - boardW) / 2,
                    y: logoH + progressBarH + boardH * 0.05,
                    width: boardW,
                    height: boardH * 0.5,
                },
            },
            {
                name: 'cta_logo',
                bounds: { x: 0.65, y: 0.17, width: 0.33, height: 0.3 },
            },
        ],
    };
};

export const getForegroundGridPortraitConfig = (): ICellConfig => {
    let w;
    let h;
    let boardScale;
    const logoH = 0.13;
    const boardHorizontalPadding = 0.08;
    const boardVerticalPadding = 0.03;
    const progressBarH = 0.02;
    const { width: viewWidth, height: viewHeight } = getPlayable().viewBounds;
    const { width: cellOriginalWidth, height: cellOriginalHeight } = cellSize;

    const boardHeight = 4 * cellOriginalHeight + 3 * cellsGap;
    const boardWidth = 3 * cellOriginalWidth + 2 * cellsGap;
    const boardH = 1 - logoH - 0.15 - progressBarH - boardVerticalPadding;
    const boardW = 1 - boardHorizontalPadding;

    const scaleByH = (boardH * viewHeight) / boardHeight;
    const scaleByW = (boardW * viewWidth) / boardWidth;
    if (scaleByH > scaleByW) {
        boardScale = scaleByW;
        w = boardW;
        h = (boardScale * boardHeight) / viewHeight;
    } else {
        boardScale = scaleByH;
        w = (boardScale * boardWidth) / viewWidth;
    }

    return {
        name: 'foreground',
        cells: [
            {
                name: 'logo',
                bounds: { x: (1 - w) / 2, y: 0.15, height: logoH, width: w },
                align: CellAlign.rightTop,
            },
            {
                name: 'sound',
                bounds: { x: 0, y: 0.06, height: 0.06 },
                align: CellAlign.leftCenter,
                padding: { x: 0.05 },
            },
            {
                name: 'tutorial',
                bounds: { x: 0, y: 0.5 },
            },
            {
                name: 'cta_logo',
                bounds: { x: 0, y: 0.1, width: 1, height: 0.2 },
                padding: 0.05,
            },
        ],
    };
};
