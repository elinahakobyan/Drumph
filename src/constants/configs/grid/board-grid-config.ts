import { ICellConfig } from '@armathai/pixi-grid';

export const getBoardGridLandscapeConfig = (): ICellConfig => {
    return {
        name: 'board',
        debug: { color: 0x000000 },

        bounds: { x: 0, y: 0, width: 1, height: 0.99 },
        cells: [
            {
                name: 'pad_0_0',
                bounds: { x: 0, y: 0, width: 0.242, height: 0.33 },
            },
            {
                name: 'pad_0_1',
                bounds: { x: 0.25, y: 0, width: 0.242, height: 0.33 },
            },
            {
                name: 'pad_0_2',
                bounds: { x: 0.5, y: 0, width: 0.242, height: 0.33 },
            },
            {
                name: 'pad_0_3',
                bounds: { x: 0.75, y: 0, width: 0.242, height: 0.33 },
            },
            {
                name: 'pad_1_0',
                bounds: { x: 0, y: 0.333, width: 0.242, height: 0.33 },
            },
            {
                name: 'pad_1_1',
                bounds: { x: 0.25, y: 0.333, width: 0.242, height: 0.33 },
            },
            {
                name: 'pad_1_2',
                bounds: { x: 0.5, y: 0.333, width: 0.242, height: 0.33 },
            },
            {
                name: 'pad_1_3',
                bounds: { x: 0.75, y: 0.333, width: 0.242, height: 0.33 },
            },
            {
                name: 'pad_2_0',
                bounds: { x: 0, y: 0.6666, width: 0.242, height: 0.33 },
            },
            {
                name: 'pad_2_1',
                bounds: { x: 0.25, y: 0.6666, width: 0.242, height: 0.33 },
            },
            {
                name: 'pad_2_2',
                bounds: { x: 0.5, y: 0.6666, width: 0.242, height: 0.33 },
            },
            {
                name: 'pad_2_3',
                bounds: { x: 0.75, y: 0.6666, width: 0.242, height: 0.33 },
            },
        ],
    };
};

export const getBoardGridPortraitConfig = (): ICellConfig => {
    return {
        // debug: { color: 0xffffff },
        name: 'board',
        bounds: { x: 0, y: 0, width: 1, height: 1 },
        cells: [],
    };
};
