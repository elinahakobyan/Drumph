import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { Sprite } from '@pixi/sprite';
import { getBackgroundGridConfig } from '../constants/configs/grid-configs';
import { getBackgroundViewSpriteConfig } from '../constants/configs/sprite-configs';
import { PlayableModelEvent } from '../events/model';
import { PlayableState } from '../models/playable-model';
import { makeSprite } from '../utils';

export class BackgroundView extends PixiGrid {
    private _bg: Sprite;

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
                this._createBg('play/bg.jpg');
                break;

            case PlayableState.cta:
                // this._createBg('cta/bg.jpg');
                break;

            default:
        }
    }

    private _createBg(key: string): void {
        return;
        this._bg && this._bg.destroy();
        this._bg = makeSprite(getBackgroundViewSpriteConfig(key));
        this.setChild('bg', this._bg);
    }
}
