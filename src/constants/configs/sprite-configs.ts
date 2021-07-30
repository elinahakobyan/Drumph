import { textures } from '../../assets/textures';

export const getBackgroundViewSpriteConfig = (texture: string): SpriteConfig | string => {
    return texture;
};

export const getStarRatingCtaStarFullSpriteConfig = (): SpriteConfig | string => {
    return textures['ui/star_full' as keyof typeof textures];
};

export const getStarRatingCtaStarHalfSpriteConfig = (): SpriteConfig | string => {
    return textures['ui/star_half' as keyof typeof textures];
};

export const getStarRatingCtaIconSpriteConfig = (): SpriteConfig | string => {
    return textures['ui/cta_icon' as keyof typeof textures];
};

export const getCellBgSpriteConfig = (color: number, level: string): SpriteConfig | string => {
    return textures[`pads/${color}_${level}` as keyof typeof textures];
};

export const getCellBlockSpriteConfig = (color: string): SpriteConfig | string => {
    return textures[`pads/${color}` as keyof typeof textures];
};

export const getHintImageSpriteConfig = (): SpriteConfig | string => {
    return textures['pads/circle' as keyof typeof textures];
};

export const getPadGlowImageSpriteConfig = (): SpriteConfig | string => {
    return textures['pads/glow' as keyof typeof textures];
};
