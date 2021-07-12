import { CellAlign, ICellConfig } from '@armathai/pixi-grid';

export const getUIGridLandscapeConfig = (): ICellConfig => {
    return {
        // debug: { color: 0x4287f5 },
        name: 'ui',
        cells: [
            {
                name: 'p_cta',
                bounds: { x: 0, height: 0.2 },
                offset: { x: -40 },
                align: CellAlign.rightCenter,
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
        ],
    };
};
