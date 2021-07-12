import { ICellConfig } from '@armathai/pixi-grid';
import {
    getStarRatingCtaPrimaryButtonConfig,
    getStarRatingCtaSecondaryButtonConfig,
} from '../constants/configs/button-configs';
import { getStarRatingCTAGridConfig } from '../constants/configs/grid-configs';
import { getStarRatingCtaBoxPatchesConfig } from '../constants/configs/nineslice-configs';
import {
    getStarRatingCtaIconSpriteConfig,
    getStarRatingCtaStarFullSpriteConfig,
    getStarRatingCtaStarHalfSpriteConfig,
} from '../constants/configs/sprite-configs';
import {
    getStarRatingCtaPopupSubtitleTextConfig,
    getStarRatingCtaPopupTitleTextConfig,
} from '../constants/configs/text-configs';
import { fitText, makeNineSlice, makeSprite, makeText } from '../utils';
import { Container } from '../utils/container';
import { AbstractCTAView } from './abstract-cta-view';

class Stars extends Container {
    public constructor() {
        super();
        let starFull;
        for (let i = 0; i < 4; i += 1) {
            starFull = makeSprite(getStarRatingCtaStarFullSpriteConfig());
            starFull.x = i * starFull.width;
            this.addChild(starFull);
        }
        const starHalf = makeSprite(getStarRatingCtaStarHalfSpriteConfig());
        starHalf.x = starFull.x + starHalf.width;
        this.addChild(starHalf);
    }
}

class CtaPopup extends Container {
    public constructor() {
        super();
        const box = makeNineSlice(getStarRatingCtaBoxPatchesConfig());

        const icon = makeSprite(getStarRatingCtaIconSpriteConfig());
        icon.position.set(box.width * 0.22, box.height * 0.44);

        const title = makeText(getStarRatingCtaPopupTitleTextConfig());
        title.anchor.set(0.5);
        title.position.set(box.width * 0.7, box.height * 0.3);
        fitText(title, box.width * 0.5);

        const stars = new Stars();
        stars.position.set(box.width * 0.7 - stars.width * 0.5, box.height * 0.44);

        const subtitle = makeText(getStarRatingCtaPopupSubtitleTextConfig());
        subtitle.anchor.set(0.5);
        subtitle.position.set(box.width * 0.7, box.height * 0.6);
        fitText(subtitle, box.width * 0.5);

        this.addChild(box);
        this.addChild(icon);
        this.addChild(stars);
        this.addChild(subtitle);
        this.addChild(title);
    }
}

export class CTAView extends AbstractCTAView {
    public getGridConfig(): ICellConfig {
        return getStarRatingCTAGridConfig();
    }

    protected build(blockerAlpha?: number): void {
        super.build(blockerAlpha);
        this._buildPopup();
        this._buildButtons();
    }

    private _buildPopup(): void {
        const popup = new CtaPopup();
        this.setChild('popup', popup);
    }

    private _buildButtons(): void {
        const playBtn = this.buildPrimaryButton(getStarRatingCtaPrimaryButtonConfig());
        const retryBtn = this.buildSecondaryButton(getStarRatingCtaSecondaryButtonConfig());

        this.setChild('primary_button', playBtn);
        this.setChild('secondary_button', retryBtn);
    }
}
