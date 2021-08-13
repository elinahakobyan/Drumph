import { ICellConfig } from '@armathai/pixi-grid';
import { ParticleEffect } from '@armathai/pixi-particles';
import gsap from 'gsap/gsap-core';
import { getTraditionalCtaPrimaryButtonConfig } from '../constants/configs/button-configs';
import { getTraditionalCTAGridConfig } from '../constants/configs/grid-configs';
import { getTraditionalCtaConfettiParticleConfig } from '../constants/configs/particles-configs';
import { getCTABgImageSpriteConfig } from '../constants/configs/sprite-configs';
import { getCtaLabelTextConfig } from '../constants/configs/text-configs';
import { getPlayable, makeParticleEffect, makeSprite, makeText } from '../utils';
import { AbstractCTAView } from './abstract-cta-view';

export class CTAView extends AbstractCTAView {
    private _confettiLeft: ParticleEffect;
    private _confettiRight: ParticleEffect;

    public getGridConfig(): ICellConfig {
        return getTraditionalCTAGridConfig();
    }

    // public rebuild(config?: ICellConfig): void {
    //     super.rebuild(config);
    //     // this._positionConfetti();
    // }

    protected build(blockerAlpha?: number): void {
        this._buildBgImage();
        this._buildButtons();
        this._buildLabel();
        this._buildConfetti();
        super.build(blockerAlpha);
    }

    private _buildButtons(): void {
        const playBtn = this.buildPrimaryButton(getTraditionalCtaPrimaryButtonConfig());
        playBtn.pivot.set(playBtn.width * 0.5, playBtn.height * 0.5);
        gsap.from(playBtn.scale, {
            x: 0.9,
            y: 0.9,
            duration: 0.6,
            ease: 'Cubic.InOut',
            repeat: -1,
            yoyo: true,
        });

        this.setChild('button', playBtn);
    }

    private _buildBgImage(): void {
        const bg = makeSprite(getCTABgImageSpriteConfig());
        this.setChild('bg', bg);
    }

    private _buildLabel(): void {
        const label = makeText(getCtaLabelTextConfig());
        this.setChild('label', label);
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
