import { textures } from '../../assets/textures';

export const getPersistentCtaButtonUpPatchesConfig = (): NineSliceConfig => {
    return {
        texture: textures['ui/persistent_cta_button'],
        data: [13, 13, 13, 19],
        width: 300,
        height: 92,
    };
};

export const getTraditionalCtaBoxPatchesConfig = (): NineSliceConfig => {
    return {
        texture: textures['ui/cta_box'],
        data: [150, 56, 44, 37],
        width: 340,
        height: 200,
    };
};

export const getPadBgPatchConfig = (): NineSliceConfig => {
    return {
        texture: textures['pad/pad_bg'],
        data: [8, 7, 7, 7],
        width: 180,
        height: 170,
    };
};

export const getProgressBarFillPatchConfig = (): NineSliceConfig => {
    return {
        texture: textures['ui/fill'],
        data: [9, 4, 9, 4],
        width: 870,
        height: 10,
    };
};

export const getBgPatchConfig = (width: number, height: number): NineSliceConfig => {
    return {
        texture: textures['pad/pad_bg'],
        data: [8, 7, 7, 7],
        width,
        height,
    };
};

export const getTraditionalCtaPrimaryButtonUpPatchesConfig = (): NineSliceConfig => {
    return {
        texture: textures['ui/cta_play_button'],
        data: [13, 13, 13, 19],
        width: 280,
        height: 117,
    };
};

export const getStarRatingCtaBoxPatchesConfig = (): NineSliceConfig => {
    return {
        texture: textures['ui/cta_box'],
        data: [150, 56, 44, 37],
        width: 640,
        height: 360,
    };
};

export const getStarRatingCtaPrimaryButtonUpPatchesConfig = (): NineSliceConfig => {
    return {
        texture: textures['ui/cta_play_button'],
        data: [13, 13, 13, 19],
        width: 280,
        height: 117,
    };
};

export const getStarRatingCtaSecondaryButtonUpPatchesConfig = (): NineSliceConfig => {
    return {
        texture: textures['ui/persistent_cta_button'],
        data: [13, 13, 13, 19],
        width: 260,
        height: 110,
    };
};
