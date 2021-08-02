import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getTutorialGridConfig } from '../constants/configs/grid-configs';
import { TutorialSequenceModelEvent } from '../events/model';
import { MainViewEvent, TutorialViewEvent } from '../events/view';
import { store } from '../models/store';
import { TutorialSequenceModel } from '../models/tutorial-sequence-model';
import { postRunnable } from '../utils';
import { TutorialSequenceView } from './tutorial-sequence-view';

export class TutorialView extends PixiGrid {
    private _sequences: TutorialSequenceView[];
    private _current: TutorialSequenceView;

    public constructor() {
        super();

        lego.event.on(TutorialSequenceModelEvent.showUpdate, this._onTutorialSequenceShowUpdate, this);
        lego.event.on(TutorialSequenceModelEvent.completeUpdate, this._onTutorialCurrentCompleteUpdate, this);
    }

    public getGridConfig(): ICellConfig {
        return getTutorialGridConfig();
    }

    private _onTutorialCurrentCompleteUpdate(complete: boolean): void {
        if (!complete) {
            return;
        }

        this._switchScreenInput(false);
        this._current.hide().eventCallback('onComplete', () => {
            this._current.destroy();
            this._current = null;
            lego.event.emit(TutorialViewEvent.sequenceHideComplete);
        });
    }

    private _onTutorialSequenceShowUpdate(): void {
        const sequence = store.playable.tutorial.current;

        if (!sequence) {
            return;
        }

        this._buildSequence(sequence);
    }

    private _onMainViewClick(): void {
        lego.event.emit(TutorialViewEvent.click);
    }

    private _buildSequence(sequence: TutorialSequenceModel): void {
        const { config, index } = sequence;
        this._current = new TutorialSequenceView(config, index);

        postRunnable(() => {
            this.setChild('sequence', this._current);
            this._current.show();
            const { clickToComplete } = store.playable.tutorial.current.config;
            this._switchScreenInput(clickToComplete);
        });
    }

    private _switchScreenInput(enable: boolean): void {
        lego.event.off(MainViewEvent.click, this._onMainViewClick, this);

        enable
            ? lego.event.once(MainViewEvent.click, this._onMainViewClick, this)
            : lego.event.off(MainViewEvent.click, this._onMainViewClick, this);
    }
}
