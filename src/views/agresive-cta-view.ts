import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { PlayableModelEvent } from '../events/model';
import { CTAViewEvent } from '../events/view';
import { PlayableState } from '../models/playable-model';
import { Button } from '../utils/button';

export class AgressiveCTAView extends PixiGrid {
    public constructor() {
        super();
        this.name = 'AgressiveCTAView';
        lego.event.on(PlayableModelEvent.stateUpdate, this._onPlayableStateUpdate, this);
    }

    public getGridConfig(): ICellConfig {
        return null;
    }

    protected build(blockerAlpha?: number): void {
        //
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
                this.removeChildren();
                break;
            case PlayableState.cta:
                // this.build();
                break;
            default:
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
}
