import { ICellConfig } from '@armathai/pixi-grid';
import { ParticleEffect } from '@armathai/pixi-particles';
import { getTraditionalCtaPrimaryButtonConfig } from '../constants/configs/button-configs';
import { getTraditionalCTAGridConfig } from '../constants/configs/grid-configs';
import { getTraditionalCtaBoxPatchesConfig } from '../constants/configs/nineslice-configs';
import { getTraditionalCtaConfettiParticleConfig } from '../constants/configs/particles-configs';
import {
    getTraditionalCtaPopupSubtitleTextConfig,
    getTraditionalCtaPopupTitleTextConfig,
} from '../constants/configs/text-configs';
import { fitText, getPlayable, makeNineSlice, makeParticleEffect, makeText } from '../utils';
import { Container } from '../utils/container';
import { AbstractCTAView } from './abstract-cta-view';

class CtaPopup extends Container {
    public constructor() {
        super();
        const box = makeNineSlice(getTraditionalCtaBoxPatchesConfig());

        const title = makeText(getTraditionalCtaPopupTitleTextConfig());
        title.anchor.set(0.5);
        fitText(title, box.width * 0.9);
        title.position.set(box.width / 2, box.height * 0.25);

        const subtitle = makeText(getTraditionalCtaPopupSubtitleTextConfig());
        subtitle.anchor.set(0.5);
        fitText(subtitle, box.width * 0.9);
        subtitle.position.set(box.width / 2, box.height * 0.75);

        this.addChild(box);
        this.addChild(subtitle);
        this.addChild(title);
    }
}

export class CTAView extends AbstractCTAView {
    private _confettiLeft: ParticleEffect;
    private _confettiRight: ParticleEffect;

    public getGridConfig(): ICellConfig {
        return getTraditionalCTAGridConfig();
    }

    public rebuild(config?: ICellConfig): void {
        super.rebuild(config);

        this._positionConfetti();
    }

    protected build(blockerAlpha?: number): void {
        super.build(blockerAlpha);

        this._buildPopup();
        this._buildButtons();
        this._buildConfetti();
    }

    private _buildPopup(): void {
        const popup = new CtaPopup();
        this.setChild('popup', popup);
    }

    private _buildButtons(): void {
        const playBtn = this.buildPrimaryButton(getTraditionalCtaPrimaryButtonConfig());
        this.setChild('button', playBtn);
    }

    private _buildConfetti(): void {
        const { x, height, width } = getPlayable().viewBounds;
        const confettiLeft = makeParticleEffect(getTraditionalCtaConfettiParticleConfig(x - 70, height * 0.6));
        const confettiRight = makeParticleEffect(getTraditionalCtaConfettiParticleConfig(width, height * 0.6));

        confettiRight.scale.set(-1, 1);

        confettiLeft.start();
        confettiRight.start();

        this.addChild((this._confettiLeft = confettiLeft));
        this.addChild((this._confettiRight = confettiRight));
    }

    private _positionConfetti(): void {
        if (this._confettiLeft && this._confettiRight) {
            const { x, height, width } = getPlayable().viewBounds;
            this._confettiLeft.x = x - 70;
            this._confettiLeft.y = height * 0.6;
            this._confettiRight.x = width;
            this._confettiRight.y = height * 0.6;
        }
    }
}
