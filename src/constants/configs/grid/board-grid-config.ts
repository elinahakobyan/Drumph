import { ICellConfig } from '@armathai/pixi-grid';

export const getBoardGridLandscapeConfig = (): ICellConfig => {
    return {
        name: 'board',
        padding: { x: 0, y: 0, width: 1, height: 1 },
        cells: [
            { name: 'board_bubble', bounds: { x: 0, y: 0, width: 1, height: 0.215 } },

            { name: 'beat', bounds: { x: 0.008, y: 0.03, width: 0.48, height: 0.265 } },
            { name: 'arp', bounds: { x: 0.513, y: 0.03, width: 0.48, height: 0.265 } },
            { name: 'bass', bounds: { x: 0.008, y: 0.37, width: 0.48, height: 0.265 } },
            { name: 'vox', bounds: { x: 0.513, y: 0.37, width: 0.48, height: 0.265 } },
            { name: 'fx', bounds: { x: 0.008, y: 0.71, width: 0.48, height: 0.265 } },
            { name: 'keys', bounds: { x: 0.513, y: 0.71, width: 0.48, height: 0.265 } },
        ],
    };
};

export const getBoardGridPortraitConfig = (): ICellConfig => {
    return {
        // debug: { color: 0xffffff },
        name: 'board',
        padding: { x: 0, y: 0, width: 1, height: 1 },
        cells: [
            { name: 'board_bubble', bounds: { x: 0, y: -0.01, width: 1, height: 0.125 } },

            { name: 'beat', bounds: { x: 0.04, y: 0, width: 0.445, height: 1 / 3 } },
            { name: 'keys', bounds: { x: 0.515, y: 2 / 3, width: 0.445, height: 1 / 3 } },
            { name: 'vox', bounds: { x: 0.515, y: 1 / 3, width: 0.445, height: 1 / 3 } },
            { name: 'bass', bounds: { x: 0.04, y: 1 / 3, width: 0.445, height: 1 / 3 } },
            { name: 'fx', bounds: { x: 0.04, y: 2 / 3, width: 0.445, height: 1 / 3 } },
            { name: 'arp', bounds: { x: 0.515, y: 0 / 3, width: 0.445, height: 1 / 3 } },
        ],
    };
};
