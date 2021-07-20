import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { NineSlicePlane } from 'pixi.js';
import { getBackgroundGridConfig } from '../constants/configs/grid-configs';
import { getBgPatchConfig } from '../constants/configs/nineslice-configs';
import { PlayableModelEvent } from '../events/model';
import { PlayableState } from '../models/playable-model';
import { makeNineSlice } from '../utils';

export class BackgroundView extends PixiGrid {
    private _bg: NineSlicePlane;

    public constructor() {
        super();
        this.name = 'BackgroundView';
        lego.event.on(PlayableModelEvent.stateUpdate, this._onPlayableStateUpdate, this);
    }

    public getGridConfig(): ICellConfig {
        return getBackgroundGridConfig();
    }

    private _onPlayableStateUpdate(status: PlayableState): void {
        switch (status) {
            case PlayableState.play:
                this._createBg();
                break;

            case PlayableState.cta:
                // this._createBg('cta/bg.jpg');
                break;

            default:
        }
    }

    private _createBg(): void {
        const bg = makeNineSlice(getBgPatchConfig(window.innerWidth, window.innerHeight));
        bg.tint = 0x000000;

        // this._bg && this._bg.destroy();
        // this._bg = makeSprite(getBackgroundViewSpriteConfig(key));
        this.setChild('bg', (this._bg = bg));
    }
}
