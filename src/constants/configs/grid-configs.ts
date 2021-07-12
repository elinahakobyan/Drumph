import { ICellConfig } from '@armathai/pixi-grid';
import { lp } from '../../utils';
import { getBackgroundGridLandscapeConfig, getBackgroundGridPortraitConfig } from './grid/background-grid-configs';
import {
    getStarRatingCTAGridLandscapeConfig,
    getStarRatingCTAGridPortraitConfig,
    getTraditionalCtaGridLandscapeConfig,
    getTraditionalCtaGridPortraitConfig,
} from './grid/cta-grid-configs';
import { getForegroundGridLandscapeConfig, getForegroundGridPortraitConfig } from './grid/foreground-grid-configs';
import { getMainGridLandscapeConfig, getMainGridPortraitConfig } from './grid/main-grid-configs';
import { getPlayGridLandscapeConfig, getPlayGridPortraitConfig } from './grid/play-grid-configs';
import { getUIGridLandscapeConfig, getUIGridPortraitConfig } from './grid/ui-grid-configs';

export const getMainGridConfig = (): ICellConfig => {
    return lp(getMainGridLandscapeConfig, getMainGridPortraitConfig).call(null);
};

export const getBackgroundGridConfig = (): ICellConfig => {
    return lp(getBackgroundGridLandscapeConfig, getBackgroundGridPortraitConfig).call(null);
};

export const getForegroundGridConfig = (): ICellConfig => {
    return lp(getForegroundGridLandscapeConfig, getForegroundGridPortraitConfig).call(null);
};

export const getUIGridConfig = (): ICellConfig => {
    return lp(getUIGridLandscapeConfig, getUIGridPortraitConfig).call(null);
};

export const getPlayGridConfig = (): ICellConfig => {
    return lp(getPlayGridLandscapeConfig, getPlayGridPortraitConfig).call(null);
};

export const getTraditionalCTAGridConfig = (): ICellConfig => {
    return lp(getTraditionalCtaGridLandscapeConfig, getTraditionalCtaGridPortraitConfig).call(null);
};

export const getStarRatingCTAGridConfig = (): ICellConfig => {
    return lp(getStarRatingCTAGridLandscapeConfig, getStarRatingCTAGridPortraitConfig).call(null);
};
