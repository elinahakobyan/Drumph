import { CellAlign, CellScale, ICellConfig } from '@armathai/pixi-grid';
import { getPlayable, isSquareLikeScreen } from '../../../utils';
import { boardPadding, cellsGap, cellSize } from '../../constants';

export const getPlayGridLandscapeConfig = (): ICellConfig => {
    const logoH = isSquareLikeScreen() ? 0.26 : 0.16;
    const progressBarH = 0.04;
    const { width: viewWidth, height: viewHeight } = getPlayable().viewBounds;
    const { width: cellOriginalWidth, height: cellOriginalHeight } = cellSize;

    const boardHeight = 3 * cellOriginalHeight + 2 * cellsGap;
    const boardWidth = 4 * cellOriginalWidth + 3 * cellsGap;
    const boardH = 1 - logoH - boardPadding;
    const boardScale = (boardH * viewHeight) / boardHeight;
    const boardW = (boardWidth * boardScale) / viewWidth;

    return {
        // debug: { color: 0x2fc900 },
        name: 'play',
        cells: [
            {
                name: 'board',
                debug: { color: 0x2fc900 },
                bounds: { x: (1 - boardW) / 2, y: logoH + progressBarH, width: boardW, height: boardH },
                scale: CellScale.showAll,
            },
            {
                // debug: { color: 0x2fc900 },
                name: 'popUp',
                bounds: {
                    x: (1 - boardW) / 2,
                    y: logoH + progressBarH + boardH * 0.05,
                    width: boardW,
                    height: boardH * 0.5,
                },
            },
            {
                // debug: { color: 0x000000 },
                name: 'text',
                bounds: {
                    x: (1 - boardW) / 2,
                    y: logoH + progressBarH + boardH * 0.35,
                    width: boardW,
                    height: boardH * 0.3,
                },
            },
        ],
    };
};

export const getPlayGridPortraitConfig = (): ICellConfig => {
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
        h = boardH;
        w = (boardScale * boardWidth) / viewWidth;
    }

    return {
        // debug: { color: 0x2fc900 },
        name: 'play',
        cells: [
            {
                name: 'board',
                bounds: { x: (1 - w) / 2, y: logoH + 0.15 + progressBarH, width: w, height: h },
                align: CellAlign.centerTop,
                scale: CellScale.showAll,
            },
        ],
    };
};
