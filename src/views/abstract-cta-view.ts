/* eslint-disable @typescript-eslint/ban-ts-comment */
import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { Graphics } from '@pixi/graphics';
import { PlayableModelEvent } from '../events/model';
import { CTAViewEvent } from '../events/view';
import { PlayableState } from '../models/playable-model';
import { getParams, getPlayable } from '../utils';
import { Button } from '../utils/button';

export abstract class AbstractCTAView extends PixiGrid {
    private _blocker: Graphics;

    public constructor() {
        super();
        this.name = 'CTAView';
        lego.event.on(PlayableModelEvent.stateUpdate, this._onPlayableStateUpdate, this);
    }

    protected build(blockerAlpha = 0): void {
        this._buildBlocker(blockerAlpha);
    }

    protected buildPrimaryButton(config: ButtonConfig): Button {
        return this._buildButton(config, this._onPlayClick);
    }

    protected buildSecondaryButton(config: ButtonConfig): Button {
        return this._buildButton(config, this._onRetryClick);
    }

    private _onPlayableStateUpdate(status: PlayableState): void {
        switch (status) {
            case PlayableState.play:
                // this.removeChildren();
                break;
            case PlayableState.cta:
                this.build(0);
                break;
            default:
        }
    }

    private _buildBlocker(alpha = 1): void {
        const { x, y, width, height } = getPlayable().viewBounds;
        this._blocker = new Graphics();
        this._blocker.beginFill(0xfffffff, alpha);
        this._blocker.drawRect(x, y, width, height);
        this._blocker.interactive = true;
        this.setChild('blocker', this._blocker);
        console.warn(getParams().ctaScreenClickable.value);

        if (getParams().ctaScreenClickable.value) {
            this._blocker.on('pointerdown', this._onScreenClick, this);
        }
    }

    private _buildButton(config: ButtonConfig, callback: Callback): Button {
        const btn = new Button(config);
        btn.on('click', callback, this);

        return btn;
    }

    private _onScreenClick(): void {
        lego.event.emit(CTAViewEvent.screenClick);
    }

    private _onPlayClick(): void {
        lego.event.emit(CTAViewEvent.primaryButtonClick);
    }

    private _onRetryClick(): void {
        lego.event.emit(CTAViewEvent.secondaryButtonClick);
    }

    public abstract getGridConfig(): ICellConfig;
}
