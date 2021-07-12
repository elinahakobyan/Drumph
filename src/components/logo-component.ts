import { Sprite } from '@pixi/sprite';
import { getLogoTextureConfig } from '../constants/configs/texture-configs';
import { makeTexture } from '../utils';

export class LogoComponent extends Sprite {
    public constructor() {
        super(makeTexture(getLogoTextureConfig()));
    }
}
