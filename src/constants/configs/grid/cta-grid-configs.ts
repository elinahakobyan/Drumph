import { CellAlign, CellScale, ICellConfig } from '@armathai/pixi-grid';

export const getTraditionalCtaGridLandscapeConfig = (): ICellConfig => {
    return {
        name: 'cta',
        // debug: { color: 0xffffff },
        cells: [
            {
                name: 'button',
                bounds: { x: 0.5, y: 0.57, width: 0.48, height: 0.3 },
                padding: { x: 0.04 },
                align: CellAlign.leftCenter,
            },
            {
                name: 'label',
                bounds: { x: 0.5, y: 0.5, height: 0.07, width: 0.48 },
                padding: 0.03,
                align: CellAlign.leftCenter,
            },
            {
                name: 'bg',
                bounds: { x: 0, y: 0, width: 0.5, height: 1 },
                scale: CellScale.envelop,
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
                name: 'button',
                bounds: { x: 0, y: 0.73, width: 1, height: 0.1 },
            },
            {
                name: 'label',
                bounds: { x: 0, y: 0.66, width: 1, height: 0.07 },
                align: CellAlign.centerBottom,
            },
            {
                name: 'blocker',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
                scale: CellScale.fill,
            },
            {
                name: 'bg',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
                padding: 0.1,
                scale: CellScale.envelop,
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
