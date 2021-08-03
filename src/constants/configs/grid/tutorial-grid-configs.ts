import { ICellConfig } from '@armathai/pixi-grid';

export const getTutorialGridLandscapeConfig = (): ICellConfig => {
    return {
        name: 'tutorial',
        // debug: { color: 0xd95027 },
        cells: [
            {
                debug: { color: 0xd95027 },
                name: 'sequence',
                bounds: {
                    x: 0,
                    y: 0,
                },
            },
        ],
    };
};

export const getTutorialGridPortraitConfig = (): ICellConfig => {
    return {
        name: 'tutorial',
        cells: [
            {
                name: 'sequence',
                bounds: { x: 0, y: 0 },
            },
        ],
    };
};
