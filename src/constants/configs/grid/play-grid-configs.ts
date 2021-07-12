import { ICellConfig } from '@armathai/pixi-grid';

export const getPlayGridLandscapeConfig = (): ICellConfig => {
    return {
        // debug: { color: 0x2fc900 },
        name: 'play',
        cells: [
            {
                name: 'board',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
                padding: { x: 0.2, y: 0.16, width: 0.6, height: 0.6 },
            },
        ],
    };
};

export const getPlayGridPortraitConfig = (): ICellConfig => {
    return {
        // debug: { color: 0x2fc900 },
        name: 'play',
        cells: [
            {
                name: 'board',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
                padding: { x: 0.05, y: 0.2, width: 0.9, height: 0.6 },
            },
        ],
    };
};
