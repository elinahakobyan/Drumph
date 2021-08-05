import { textures } from '../../assets/textures';

export const getHandTextureConfig = (): TextureConfig => {
    return textures['ui/hand'];
};

export const getLogoTextureConfig = (): TextureConfig => {
    return textures['ui/logo'];
};

export const getSoundOnTextureConfig = (config: string): TextureConfig => {
    return textures[`ui/sound_on_${config}` as keyof typeof textures];
};

export const getSoundOffTextureConfig = (config: string): TextureConfig => {
    return textures[`ui/sound_off_${config}` as keyof typeof textures];
};
