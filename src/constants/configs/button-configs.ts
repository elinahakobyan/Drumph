import {
    getPersistentCtaButtonUpPatchesConfig,
    getStarRatingCtaPrimaryButtonUpPatchesConfig,
    getStarRatingCtaSecondaryButtonUpPatchesConfig,
    getTraditionalCtaPrimaryButtonUpPatchesConfig,
} from './nineslice-configs';
import {
    getPersistentCtaButtonUpTextConfig,
    getStarRatingCtaPrimaryButtonUpTextConfig,
    getStarRatingCtaSecondaryButtonUpTextConfig,
    getTraditionalCtaPrimaryButtonUpTextConfig,
} from './text-configs';

// PERSISTENT CTA
export const getPersistentCtaButtonConfig = (): ButtonConfig => {
    return {
        states: {
            up: {
                bg: getPersistentCtaButtonUpPatchesConfig(),
                label: getPersistentCtaButtonUpTextConfig(),
            },
        },
    };
};

export const getTraditionalCtaPrimaryButtonConfig = (): ButtonConfig => {
    return {
        states: {
            up: {
                bg: getTraditionalCtaPrimaryButtonUpPatchesConfig(),
                label: getTraditionalCtaPrimaryButtonUpTextConfig(),
            },
        },
    };
};

export const getStarRatingCtaPrimaryButtonConfig = (): ButtonConfig => {
    return {
        states: {
            up: {
                bg: getStarRatingCtaPrimaryButtonUpPatchesConfig(),
                label: getStarRatingCtaPrimaryButtonUpTextConfig(),
            },
        },
    };
};

export const getStarRatingCtaSecondaryButtonConfig = (): ButtonConfig => {
    return {
        states: {
            up: {
                bg: getStarRatingCtaSecondaryButtonUpPatchesConfig(),
                label: getStarRatingCtaSecondaryButtonUpTextConfig(),
            },
        },
    };
};
