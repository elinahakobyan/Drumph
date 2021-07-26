import { CellAlign, ICellConfig } from '@armathai/pixi-grid';

export const getUIGridLandscapeConfig = (): ICellConfig => {
    return {
        debug: { color: 0x4287f5 },
        name: 'ui',
        cells: [
            {
                name: 'p_cta',
                bounds: { x: 0, height: 0 },
                offset: { x: -40 },
                align: CellAlign.rightCenter,
            },
            {
                name: 'progress_bar',
                bounds: { x: 0.21, y: 0.16, width: 0.58, height: 0.05 },
                align: CellAlign.center,
            },
        ],
    };
};

export const getUIGridPortraitConfig = (): ICellConfig => {
    return {
        // debug: { color: 0x4287f5 },
        name: 'ui',
        cells: [
            {
                name: 'p_cta',
                bounds: { x: 0, y: 0.85 },
            },
            {
                name: 'progress_bar',
                bounds: { x: 0, height: 0.2 },
            },
        ],
    };
};
