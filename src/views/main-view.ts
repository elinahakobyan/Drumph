/* eslint-disable @typescript-eslint/ban-ts-comment */
import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { Rectangle } from '@pixi/math';
import { getMainGridConfig } from '../constants/configs/grid-configs';
import { PlayableModelEvent } from '../events/model';
import { PlayableEvent } from '../events/playable';
import { MainViewEvent } from '../events/view';
import { PlayableState } from '../models/playable-model';
import { getPlayable } from '../utils';
import { BackgroundView } from './background-view';
import { CTAView } from './cta-view';
import { ForegroundView } from './foreground-view';
import { PlayView } from './play-view';
import { UIView } from './ui-view';

export class MainView extends PixiGrid {
    private _ctaView: CTAView;
    public constructor() {
        super();
        this._build();
        this.name = 'MainView';
        lego.event
            .on(PlayableModelEvent.stateUpdate, this._onPlayableStateUpdate, this)
            .on(PlayableEvent.resize, this.onResize, this);
    }

    public onResize(): void {
        this.rebuild(this.getGridConfig());
        this._updateScale();
        this._updateHitArea();
    }

    public getGridConfig(): ICellConfig {
        return getMainGridConfig();
    }

    private _onPlayableStateUpdate(state: PlayableState): void {
        switch (state) {
            case PlayableState.cta:
                // this.rebuildChild(this._ctaView);
                break;
            default:
        }
    }

    private _build(): void {
        this._updateScale();
        this._setInteractive();
        this._updateHitArea();

        // eslint-disable-next-line @typescript-eslint/naming-convention
        // const { CTAView } = require(__CTA_MODULE__);
        this.setChild('main', new BackgroundView());
        this.setChild('main', new PlayView());
        this.setChild('main', new UIView());
        this.setChild('main', (this._ctaView = new CTAView()));
        this.setChild('main', new ForegroundView());
    }

    private _updateScale(): void {
        this.scale.set(getPlayable().viewScale);
    }

    private _updateHitArea(): void {
        this.hitArea = new Rectangle().copyFrom(getPlayable().viewBounds);
    }

    private _setInteractive(): void {
        this.interactive = true;
        this.on('pointerup', this._onPointerUp, this);
    }

    private _onPointerUp(): void {
        lego.event.emit(MainViewEvent.click);
    }
}
