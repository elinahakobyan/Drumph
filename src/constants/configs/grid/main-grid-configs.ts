/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ICellConfig } from '@armathai/pixi-grid';
import { getPlayable } from '../../../utils';

export const getMainGridLandscapeConfig = (): ICellConfig => {
    return {
        name: 'main',
        // debug: { color: 0xd95027 },
        bounds: getPlayable().viewBounds,
    };
};

export const getMainGridPortraitConfig = (): ICellConfig => {
    return {
        name: 'main',
        // debug: { color: 0xd95027 },
        bounds: getPlayable().viewBounds,
    };
};
