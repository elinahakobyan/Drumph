import { lego } from '@armathai/lego';
import { Sprite } from 'pixi.js';
import {
    getCellBgSpriteConfig,
    getCellBlockSpriteConfig,
    getHintImageSpriteConfig,
    getPadGlowImageSpriteConfig,
} from '../../constants/configs/sprite-configs';
import { PadViewEvent } from '../../events/view';
import { PadModel } from '../../models/pads/pad-model';
import { getParams, makeSprite } from '../../utils';
import { Container } from '../../utils/container';

export class PadComponent extends Container {
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
        this.interactive = true;
        this._build();
    }

    public get uuid(): string {
        return this._uuid;
    }

    public block(): void {
        this._blocker.visible = true;
        this.interactive = false;
    }

    public activate(): void {
        this._blocker.visible = false;
        this.interactive = true;
    }

    public deactivate(): void {
        this._blocker.visible = false;
        this.interactive = false;
    }

    public updateClickListener(value: boolean): void {
        value ? this._addListener() : this._removeListener();
        // this._blocker.visible = true;
        // this.interactive = false;
    }

    public showHint(): void {
        this._hint.alpha = 1;
        this._glow.alpha = 1;

        // gsap.from(this._hint, {
        //     alpha: 1,
        //     duration: 14,
        //     ease: 'Cubic.InOut',
        // });
    }

    public showAnimation(): void {
        gsap.from(this, {
            alpha: 0.6,
            duration: 0.6,
            ease: 'Cubic.InOut',
            repeat: 0,
            yoyo: true,
        });
        //ParticlesEffect
        // const tw = makeParticleEffect(getTraditionalCtaConfettiParticleConfig(100, 100));
        // this.addChild(tw);
    }

    public hideHint(): void {
        this._hint.alpha = 0;
        this._glow.alpha = 0;

        // gsap.from(this._hint, {
        //     alpha: 0,
        //     duration: 14,
        //     ease: 'Cubic.InOut',
        // });
    }

    private _build(): void {
        this._buildBg();
        this._buildBlocker();
        this._buildHint();
        this._buildGlow();
    }

    private _buildBg(): void {
        const cell = makeSprite(getCellBgSpriteConfig(this._color, getParams().square_color_patterns.value));
        this.addChild((this._pad = cell));
    }

    private _buildBlocker(): void {
        const blocker = makeSprite(getCellBlockSpriteConfig(getParams().emptySquareColor.value.toLowerCase()));
        blocker.visible = true;
        this._pad.addChild((this._blocker = blocker));
    }

    private _buildHint(): void {
        const hint = makeSprite(getHintImageSpriteConfig());
        hint.scale.set(0.3);
        hint.position.x = -this._pad.width * 0.5 + 40;
        hint.position.y = this._pad.height * 0.5 - 40;
        hint.alpha = 0;
        this.addChild((this._hint = hint));
    }

    private _buildGlow(): void {
        const glow = makeSprite(getPadGlowImageSpriteConfig());
        glow.alpha = 0;
        this.addChild((this._glow = glow));
    }

    private _addListener(): void {
        this.on('pointerdown', this._click);
    }

    private _removeListener(): void {
        this.off('pointerdown', this._click);
    }

    private _click(): void {
        // console.warn('hjghbv');

        lego.event.emit(PadViewEvent.click, this._uuid);
    }
}

// public showPrompt(promptString: string): void {
//     if (promptString) {
//         const commitText = makeText(getPromptTextConfig(promptString));
//         commitText.rotation = lp(0, -Math.PI * 0.5);
//         this.addChild(commitText);
//         commitText.alpha = 0;
//         gsap.from(commitText, {
//             alpha: 1,
//             duration: 0.6,
//             ease: 'Cubic.InOut',
//         });
//     }
// }
