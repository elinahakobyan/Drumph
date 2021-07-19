// const cellColorsCode: ColorsCode = {
//     [CellColors.blue]: 'blue',
//     [CellColors.green]: 'green',
//     [CellColors.red]: 'red',
//     [CellColors.yellow]: 'yellow',
//     [CellColors.pink]: 'pink',
// };

import { NineSlicePlane, Rectangle, Sprite } from 'pixi.js';
import { getPadBgPatchConfig } from '../constants/configs/nineslice-configs';
import { PadModel } from '../models/pads/pad-model';
import { makeNineSlice } from '../utils';
import { Container } from '../utils/container';

export class PadComponent extends Container {
    private _cell: Sprite;
    private _blocker: Sprite;
    private _bg: NineSlicePlane;
    private _hint: Sprite;
    private _name: string;
    private _config: PadModel;

    //private _uuid: string, private _color: number, private _audio: string, private _index: number
    public constructor(padModel: PadModel) {
        super();
        this._config = padModel;

        this._name = padModel.name;

        this._build();
    }

    public get uuid(): string {
        return this._name;
    }

    public get name(): string {
        return this._name;
    }

    public block(): void {
        this._blocker.visible = true;
        this.interactive = false;
    }

    public activate(): void {
        this._bg.tint = this._config.activeColor;
        this.interactive = true;
    }

    public deactivate(): void {
        this._bg.tint = this._config.passiveColor;
        this.interactive = false;
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

    // public showHint(): void {
    //     this._hint.alpha = 1;
    //     // gsap.from(this._hint, {
    //     //     alpha: 1,
    //     //     duration: 14,
    //     //     ease: 'Cubic.InOut',
    //     // });
    // }

    // public hideHint(): void {
    //     this._hint.alpha = 0;

    //     // gsap.from(this._hint, {
    //     //     alpha: 0,
    //     //     duration: 14,
    //     //     ease: 'Cubic.InOut',
    //     // });
    // }
    public getBounds(): Rectangle {
        return this._bg.getBounds();
    }

    private _build(): void {
        this._buildBg();

        // this._buildHint();
    }

    private _buildBg(): void {
        const bg = makeNineSlice(getPadBgPatchConfig());
        bg.tint = 0x282829;
        this.addChild((this._bg = bg));
    }

    //     private _buildHint(): void {
    //         const hint = makeSprite(getHintImageSpriteConfig());
    //         hint.scale.set(0.3);
    //         hint.position.x = -this._cell.width * 0.5 + 40;
    //         hint.position.y = this._cell.height * 0.5 - 40;
    //         hint.alpha = 0;
    //         this.addChild((this._hint = hint));
    //     }

    //     private _addListener(): void {
    //         this.on('pointerdown', () => {
    //             lego.event.emit(CellViewEvent.onClick, this._uuid);
    //         });
    //     }
}
