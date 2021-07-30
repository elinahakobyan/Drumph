import { CellAlign, ICellConfig } from '@armathai/pixi-grid';
import { getPlayable, isSquareLikeScreen } from '../../../utils';
import { boardPadding, cellsGap, cellSize } from '../../constants';

export const getUIGridLandscapeConfig = (): ICellConfig => {
    // const logoH = 0.2;
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
        debug: { color: 0x4287f5 },
        name: 'ui',
        cells: [
            // {
            // name: 'p_cta',
            // bounds: { x: 0, height: 0.2 },
            // offset: { x: -40 },
            // align: CellAlign.rightCenter,
            // },

            {
                // debug: { color: 0x4287f5 },
                name: 'progress_bar',
                bounds: { x: (1 - boardW) / 2, y: logoH, width: boardW, height: progressBarH },
                align: CellAlign.leftTop,
            },
        ],
    };
};

export const getUIGridPortraitConfig = (): ICellConfig => {
    let w;
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
    } else {
        boardScale = scaleByH;
        w = (boardScale * boardWidth) / viewWidth;
    }

    return {
        // debug: { color: 0x4287f5 },
        name: 'ui',
        cells: [
            {
                name: 'progress_bar',
                bounds: { x: (1 - w) / 2, y: 0.28, width: w, height: progressBarH },
                align: CellAlign.leftBottom,
            },
            // {
            //     name: 'p_cta',
            //     bounds: { x: 0, y: 0.85 },
            // },
        ],
    };
};
