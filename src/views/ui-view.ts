import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { PersistentCTAComponent } from '../components/persistent-cta-component';
import { getUIGridConfig } from '../constants/configs/grid-configs';
import { PlayableModelEvent, PlayModelEvent } from '../events/model';
import { PersistentCtaModel } from '../models/persistent-cta-model';
import { ProgressBarModel } from '../models/progress-bar-model';
import { ProgressBarView } from './progress-bar-view';

export class UIView extends PixiGrid {
    private _persistentCta: PersistentCTAComponent;
    private _progressBar: ProgressBarView;

    public constructor() {
        super();
        this.name = 'UIView';
        lego.event.on(PlayableModelEvent.persistentCtaUpdate, this._onPlayablePersistentCtaUpdate, this);
        lego.event.on(PlayModelEvent.progressBarUpdate, this._onProgressBarUpdate, this);
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

    // /ProgressBar
    private _onProgressBarUpdate(progressBar: ProgressBarModel): void {
        console.warn(progressBar);
        progressBar ? this._buildProgressBar() : this._destroyProgressBar();
    }

    private _buildProgressBar(): void {
        this._progressBar = new ProgressBarView();
        this.setChild('progress_bar', this._progressBar);
        // this._progressBar.rotation = lp(0, Math.PI * 0.5);
    }

    private _destroyProgressBar(): void {
        this._progressBar.destroy();
        this._progressBar = null;
    }
}
