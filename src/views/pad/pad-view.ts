import { lego } from '@armathai/lego';
import gsap from 'gsap/gsap-core';
import { Sprite } from 'pixi.js';
import {
    getCellBgSpriteConfig,
    getCellBlockSpriteConfig,
    getHintImageSpriteConfig,
    getPadGlowImageSpriteConfig,
} from '../../constants/configs/sprite-configs';
import { getPromptTextConfig } from '../../constants/configs/text-configs';
import { PadViewEvent } from '../../events/view';
import { PadModel } from '../../models/pads/pad-model';
import { getParams, lp, makeSprite, makeText } from '../../utils';
import { Container } from '../../utils/container';

export class PadView extends Container {
    private _blocker: Sprite;
    private _pad: Sprite;
    private _hint: Sprite;
    private _glow: Sprite;
    private _uuid: string;
    private _config: PadModel;
    private _color: number;

    //private _uuid: string, private _color: number, private _audio: string, private _index: number
    public constructor(padModel: PadModel) {
        super();
        this._config = padModel;
        this._color = padModel.passiveColor;
        this._uuid = padModel.uuid;

        this.name = 'PadComponent';
        this._build();
        this._pad.interactive = true;
    }

    public get uuid(): string {
        return this._uuid;
    }

    public block(): void {
        this._blocker.visible = true;
        this._pad.interactive = false;
    }

    public activate(): void {
        this._blocker.visible = false;
        this._pad.interactive = true;
    }

    public deactivate(): void {
        console.warn('hasa');
        this._blocker.visible = false;
        this._pad.interactive = false;
    }

    public updateClickListener(value: boolean): void {
        value ? this._addListener() : this._removeListener();
        // this._blocker.visible = true;
        // this.interactive = false;
    }

    public showPrompt(promptString: string): void {
        if (promptString) {
            const commitText = makeText(getPromptTextConfig(promptString));
            commitText.rotation = lp(0, -Math.PI * 0.5);
            commitText.position.set(this.width * 0.5, -this.height * 0.5);
            this.addChild(commitText);

            commitText.alpha = 0;
            gsap.from(commitText, {
                alpha: 1,
                duration: 0.6,
                ease: 'Cubic.InOut',
            });
        }
    }

    public showHint(): void {
        this._hint.alpha = 1;

        gsap.timeline({ universal: true }).add([
            gsap.to(this.scale, {
                x: 1.04,
                y: 1.04,
                duration: 0.3,
                ease: 'Cubic.In',
                repeat: 1,
                yoyo: true,
            }),
            gsap.from(this._glow, { alpha: 1, duration: 1, ease: 'Sine.InOut', repeat: 0, yoyo: true }),
        ]);
    }

    public showAnimation(): void {
        console.warn('hasa vaerjapes');

        gsap.from(this, {
            alpha: 0.6,
            duration: 0.6,
            ease: 'Cubic.InOut',
        });

        //ParticlesEffect
        // const tw = makeParticleEffect(getTraditionalCtaConfettiParticleConfig(100, 100));
        // this.addChild(tw);
    }

    public hideHint(): void {
        this._hint.alpha = 0;
        // gsap.timeline({ universal: true }).add([
        //     gsap.from(this.scale, {
        //         x: 1,
        //         y: 1,
        //         duration: 0.8,
        //         ease: 'Sine.InOut',
        //     }),
        //     gsap.from(this._glow, { alpha: 0, duration: 0.6, ease: 'Sine.InOut' }),
        // ]);
    }

    private _build(): void {
        this._buildBg();
        this._buildBlocker();
        this._buildHint();
        this._buildGlow();
        this._buildHighlight();
    }

    private _buildBg(): void {
        const cell = makeSprite(getCellBgSpriteConfig(this._color, getParams().square_color_patterns.value));
        this.addChild((this._pad = cell));
    }

    private _buildHighlight(): void {
        const cell = makeSprite(getCellBlockSpriteConfig('white'));
        cell.alpha = 0;
        this.addChild(cell);
    }

    private _buildBlocker(): void {
        const blocker = makeSprite(getCellBlockSpriteConfig(getParams().emptySquareColor.value.toLowerCase()));
        blocker.visible = true;
        this._pad.addChild((this._blocker = blocker));
    }

    private _buildHint(): void {
        const hint = makeSprite(getHintImageSpriteConfig());
        hint.scale.set(0.3);
        hint.position.x = -60;
        hint.position.y = -60;
        hint.alpha = 0;
        this.addChild((this._hint = hint));
    }

    private _buildGlow(): void {
        const glow = makeSprite(getPadGlowImageSpriteConfig());
        glow.alpha = 0;
        this.addChild((this._glow = glow));
    }

    private _addListener(): void {
        this._pad.on('pointerdown', this._click, this);
    }

    private _removeListener(): void {
        this._pad.off('pointerdown', this._click, this);
    }

    private _click(): void {
        lego.event.emit(PadViewEvent.click, this._uuid);
    }
}
