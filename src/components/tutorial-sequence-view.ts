import gsap from 'gsap';
import { Container, NineSlicePlane, Text } from 'pixi.js';
import { getTutorialPopUpConfigs } from '../constants/configs/nineslice-configs';
import { getTutorialTextConfig, getTutorialTextWithBgConfig } from '../constants/configs/text-configs';
import { getParams, makeNineSlice, makeText } from '../utils';

export class TutorialSequenceView extends Container {
    private _label: Container;
    private _bg: NineSlicePlane;
    public constructor(
        private _config: { text: string; duration: number; clickToComplete: boolean },
        private _index: number,
    ) {
        super();
        this._build();
    }

    public hide(): gsap.core.Tween {
        return gsap.to(this.position, {
            y: -1000,
            duration: 0.5,
        });
    }

    public show(): gsap.core.Tween {
        return gsap.from(this, {
            y: 1000,
            duration: 0.5,
        });
    }

    private _build(): void {
        const bg = this._buildBg();
        const text = this._buildLabel();
        this.addChild(bg);
        this.addChild(text);
    }

    private _buildBg(): NineSlicePlane {
        this._bg = makeNineSlice(getTutorialPopUpConfigs());
        this._bg.alpha = getParams().tutorial_design.value ? 0 : 1;

        return this._bg;
    }

    private _buildLabel(): Text {
        const t = getParams().tutorial_design.value
            ? makeText(getTutorialTextConfig(this._config.text))
            : makeText(getTutorialTextWithBgConfig(this._config.text));

        t.position.set(this._bg.width * 0.5, this._bg.height * 0.5);
        return t;
    }
}
