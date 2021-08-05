import gsap from 'gsap/gsap-core';
import { NineSlicePlane, Texture } from 'pixi.js';
import { getScoreNextLevelButtonConfig } from '../constants/configs/button-configs';
import { getScoreNumberConfig, getScorePopUpTextConfig } from '../constants/configs/text-configs';
import { makeText } from '../utils';
import { Button } from '../utils/button';

export class ScoreComponent extends NineSlicePlane {
    private _bg: NineSliceConfig;

    public constructor(private _score: number) {
        super(Texture.from('play/score_bg.png'), 24, 24, 24, 24);
        this.width = 800;
        this.height = 350;
        this.name = 'ForegroundView';
        this._build();
    }

    public show(): void {
        gsap.to(this.position, {
            duration: 0.8,
        });
    }

    private _build(): void {
        this._buildBtn();
        this._buildText();
    }

    private _buildText(): void {
        const text = makeText(getScorePopUpTextConfig());
        const scoreNumbers = makeText(getScoreNumberConfig(this._score));
        scoreNumbers.position.set(420, 190);
        text.position.set(420, 100);
        this.addChild(text);
        this.addChild(scoreNumbers);
    }

    private _buildBtn(): void {
        const btn = new Button(getScoreNextLevelButtonConfig());
        btn.position.set(55, 260);
        btn.interactive = true;
        btn.on('pointerdown', () => {
            btn.alpha = 0.56;
            this.emit('scoreBtnClick', btn);
        });
        this.addChild(btn);
    }
}
