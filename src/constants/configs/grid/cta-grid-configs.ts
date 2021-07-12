import { CellAlign, CellScale, ICellConfig } from '@armathai/pixi-grid';

export const getTraditionalCtaGridLandscapeConfig = (): ICellConfig => {
    return {
        // debug: { color: 0x4bdbd4 },
        name: 'cta',
        cells: [
            {
                bounds: { x: 0, height: 0.7 },
                name: 'popup',
                padding: 0.05,
                align: CellAlign.centerBottom,
            },
            {
                bounds: { x: 0 },
                name: 'button',
                align: CellAlign.centerTop,
            },
            {
                name: 'blocker',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
                scale: CellScale.fill,
            },
        ],
    };
};

export const getTraditionalCtaGridPortraitConfig = (): ICellConfig => {
    return {
        // debug: { color: 0x4bdbd4 },
        name: 'cta',
        cells: [
            {
                name: 'popup',
                bounds: { x: 0, height: 0.6 },
                padding: 0.03,
                align: CellAlign.centerBottom,
            },
            {
                name: 'button',
                bounds: { x: 0 },
                padding: { x: 0, y: 0.05, width: 1, height: 1 },
                align: CellAlign.centerTop,
            },
            {
                name: 'blocker',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
                scale: CellScale.fill,
            },
        ],
    };
};

export const getStarRatingCTAGridLandscapeConfig = (): ICellConfig => {
    return {
        // debug: { color: 0x4bdbd4 },
        name: 'cta',
        cells: [
            {
                name: 'popup',
                bounds: { x: 0, y: 0, width: 1, height: 0.7 },
                padding: 0.05,
                align: CellAlign.centerBottom,
            },
            {
                name: 'secondary_button',
                bounds: { x: 0, y: 0.7, width: 0.5 },
                offset: { x: -30, y: 30 },
                align: CellAlign.rightTop,
            },
            {
                name: 'primary_button',
                bounds: { x: 0.5, y: 0.7, width: 0.5 },
                offset: { x: 30, y: 30 },
                align: CellAlign.leftTop,
            },
            {
                name: 'blocker',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
                scale: CellScale.fill,
            },
        ],
    };
};

export const getStarRatingCTAGridPortraitConfig = (): ICellConfig => {
    return {
        // debug: { color: 0x4bdbd4 },
        name: 'cta',
        cells: [
            {
                name: 'popup',
                bounds: { x: 0, y: 0, width: 1, height: 0.6 },
                padding: 0.03,
                align: CellAlign.centerBottom,
            },
            {
                name: 'secondary_button',
                bounds: { x: 0, y: 0.6, width: 0.5 },
                offset: { x: -30, y: 30 },
                align: CellAlign.rightTop,
            },
            {
                name: 'primary_button',
                bounds: { x: 0.5, y: 0.6, width: 0.5 },
                offset: { x: 30, y: 30 },
                align: CellAlign.leftTop,
            },
            {
                name: 'blocker',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
                scale: CellScale.fill,
            },
        ],
    };
};
