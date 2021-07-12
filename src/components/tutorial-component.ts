import { lego } from '@armathai/lego';
import { AnimatedSprite } from '@pixi/sprite-animated';
import { Text } from '@pixi/text';
import { gsap } from 'gsap';
import { getScrollAnimationData } from '../constants/configs/animation-configs';
import { getTutorialTextConfig } from '../constants/configs/text-configs';
import { TutorialModelEvent } from '../events/model';
import { MainViewEvent, TutorialViewEvent } from '../events/view';
import { fitText, makeAnimation, makeText, postRunnable } from '../utils';
import { Container } from '../utils/container';

export class TutorialComponent extends Container {
    private _scroll: AnimatedSprite;
    private _label: Text;

    public constructor() {
        super();

        this._buildScrolls();
        this._buildLabel();

        postRunnable(this._show, this);

        lego.event.on(TutorialModelEvent.completeUpdate, this._onTutorialCompleteUpdate, this);
    }

    private _show(): void {
        this._switchScreenInput(true);

        const duration = this._scroll.totalFrames / this._scroll.animationSpeed / 60;
        this._scroll.play();
        const show = gsap.timeline({
            defaults: {
                ease: 'sine.in',
                duration,
            },
        });
        show.add([
            gsap.from(this._label.scale, {
                x: 0,
            }),
            gsap.from(this._label, {
                alpha: 0,
            }),
        ]);
    }

    private _hide(options?: { children?: boolean; texture?: boolean; baseTexture?: boolean }): void {
        this._switchScreenInput(false);

        const duration = this._scroll.totalFrames / this._scroll.animationSpeed / 60;
        this._scroll.animationSpeed *= -1;
        this._scroll.play();
        this._scroll.onComplete = () => {
            this._scroll.onComplete = null;
            super.destroy(options);
        };
        const hide = gsap.timeline({
            defaults: {
                ease: 'sine.out',
                duration,
            },
            onComplete: this._onHideComplete,
            callbackScope: this,
        });
        hide.add([
            gsap.to(this._label.scale, {
                x: 0,
            }),
            gsap.to(this._label, {
                alpha: 0,
            }),
        ]);
    }

    private _onHideComplete(): void {
        lego.event.emit(TutorialViewEvent.hideComplete);
    }

    private _onTutorialCompleteUpdate(): void {
        this._hide();
    }

    private _onMainViewClick(): void {
        lego.event.emit(TutorialViewEvent.click);
    }

    private _buildScrolls(): void {
        this._scroll = makeAnimation(getScrollAnimationData());
        this.addChild(this._scroll);
    }

    private _buildLabel(): void {
        this._label = makeText(getTutorialTextConfig());
        this._label.anchor.set(0.5);
        this._label.position.set(this._scroll.width * 0.5, this._scroll.height * 0.48);

        fitText(this._label, this._scroll.width - 120);
        this.addChild(this._label);
    }

    private _switchScreenInput(enable: boolean): void {
        lego.event.off(MainViewEvent.click, this._onMainViewClick, this);

        enable
            ? lego.event.once(MainViewEvent.click, this._onMainViewClick, this)
            : lego.event.off(MainViewEvent.click, this._onMainViewClick, this);
    }
}
