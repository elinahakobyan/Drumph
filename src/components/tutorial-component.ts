import { lego } from '@armathai/lego';
import { AnimatedSprite } from '@pixi/sprite-animated';
import { Text } from '@pixi/text';
import { gsap } from 'gsap';
import { getAfterTutorialTextConfig, getBeforeTutorialTextConfig } from '../constants/configs/text-configs';
import { BoardModelEvent } from '../events/model';
import { MainViewEvent, PadViewEvent, ProgressUpdateViewEvent, TutorialViewEvent } from '../events/view';
import { BoardState } from '../models/board-model';
import { makeText, postRunnable } from '../utils';
import { Container } from '../utils/container';

export class TutorialComponent extends Container {
    private _scroll: AnimatedSprite;
    private _label: Text;
    private _isAfter = false;

    public constructor() {
        super();

        this._buildScrolls();
        this._buildLabel();

        postRunnable(this._show, this);

        // lego.event.on(TutorialModelEvent.completeUpdate, this._onTutorialCompleteUpdate, this);
        lego.event.on(BoardModelEvent.stateUpdate, this._onBoardstateUpdate, this);
        lego.event.on(ProgressUpdateViewEvent.finish, this._buildLabel, this);
        lego.event.on(PadViewEvent.click, this._onTutorialCompleteUpdate, this);
    }

    private _show(): void {
        // this._switchScreenInput(true);
        // const duration = this._scroll.totalFrames / this._scroll.animationSpeed / 60;
        // this._scroll.play();
        // const show = gsap.timeline({
        //     defaults: {
        //         ease: 'sine.in',
        //         duration,
        //     },
        // });
        // show.add([
        //     gsap.from(this._label.scale, {
        //         x: 0,
        //     }),
        //     gsap.from(this._label, {
        //         alpha: 0,
        //     }),
        // ]);
    }

    private _hide(options?: { children?: boolean; texture?: boolean; baseTexture?: boolean }): void {
        this._switchScreenInput(false);

        const hide = gsap.timeline({
            defaults: {
                ease: 'sine.out',
                duration: '0.4',
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

    private _onBoardstateUpdate(value: BoardState): void {
        console.warn(value);

        switch (value) {
            case BoardState.imitation:
                this._onTutorialCompleteUpdate();
                break;
            case BoardState.play:
                break;
            case BoardState.tutorial:
                break;

            default:
                break;
        }
    }

    private _onTutorialCompleteUpdate(): void {
        this._hide();
    }

    private _onMainViewClick(): void {
        lego.event.emit(TutorialViewEvent.click);
    }

    private _buildScrolls(): void {
        //
    }

    private _buildLabel(isAfter = false): void {
        this._label = isAfter ? makeText(getAfterTutorialTextConfig()) : makeText(getBeforeTutorialTextConfig());
        this._label.anchor.set(0.5);
        this.addChild(this._label);
    }

    private _switchScreenInput(enable: boolean): void {
        lego.event.off(MainViewEvent.click, this._onMainViewClick, this);

        enable
            ? lego.event.once(MainViewEvent.click, this._onMainViewClick, this)
            : lego.event.off(MainViewEvent.click, this._onMainViewClick, this);
    }
}
