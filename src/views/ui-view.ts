import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { PersistentCTAComponent } from '../components/persistent-cta-component';
import { getUIGridConfig } from '../constants/configs/grid-configs';
import { PlayableModelEvent } from '../events/model';
import { PersistentCtaModel } from '../models/persistent-cta-model';

export class UIView extends PixiGrid {
    private _persistentCta: PersistentCTAComponent;

    public constructor() {
        super();
        this.name = 'UIView';
        lego.event.on(PlayableModelEvent.persistentCtaUpdate, this._onPlayablePersistentCtaUpdate, this);
    }

    public getGridConfig(): ICellConfig {
        return getUIGridConfig();
    }

    // PERSISTENT
    private _onPlayablePersistentCtaUpdate(tutorial: PersistentCtaModel): void {
        tutorial ? this._buildPersistentCta() : this._destroyPersistentCta();
    }

    private _buildPersistentCta(): void {
        this.setChild('p_cta', (this._persistentCta = new PersistentCTAComponent()));
    }

    private _destroyPersistentCta(): void {
        this._persistentCta.destroy();
    }
}
