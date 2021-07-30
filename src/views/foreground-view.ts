import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { HintComponent } from '../components/hint-component';
import { LogoComponent } from '../components/logo-component';
import { SoundToggleComponent } from '../components/sound-toggle-component';
import { TutorialView } from '../components/tutorial-view';
import { getForegroundGridConfig } from '../constants/configs/grid-configs';
import { PlayableModelEvent, SoundModelEvent } from '../events/model';
import { HintModel } from '../models/hint-model';
import { PlayableState } from '../models/playable-model';
import { TutorialModel } from '../models/tutorial-model';

export class ForegroundView extends PixiGrid {
    private _logo: LogoComponent;
    private _sound: SoundToggleComponent;
    private _hint: HintComponent;
    private _tutorial: TutorialView;

    public constructor() {
        super();
        this.name = 'ForegroundView';

        lego.event
            .on(PlayableModelEvent.stateUpdate, this._onPlayableStateUpdate, this)
            .on(PlayableModelEvent.hintUpdate, this._onHintUpdate, this)
            .on(SoundModelEvent.iconUpdate, this._onSoundIconUpdate, this)
            .on(PlayableModelEvent.tutorialUpdate, this._onTutorialUpdate, this);
    }

    public getGridConfig(): ICellConfig {
        return getForegroundGridConfig();
    }

    private _onPlayableStateUpdate(state: PlayableState): void {
        switch (state) {
            case PlayableState.play:
                this._build();
                break;
            case PlayableState.cta:
                break;
            default:
        }
    }

    private _build(): void {
        this._buildLogo();
    }

    private _buildLogo(): void {
        this.setChild('logo', (this._logo = new LogoComponent()));
    }

    // SOUND
    private _onSoundIconUpdate(icon: boolean): void {
        icon ? this._buildSoundToggle() : this._destroySoundToggle();
    }

    private _buildSoundToggle(): void {
        this.setChild('sound', (this._sound = new SoundToggleComponent()));
    }

    private _destroySoundToggle(): void {
        this._sound && this._sound.destroy();
    }

    // HINT
    private _onHintUpdate(hint: HintModel): void {
        hint ? this._buildHint() : this._destroyHint();
    }

    private _buildHint(): void {
        this.addChild((this._hint = new HintComponent()));
    }

    private _destroyHint(): void {
        this._hint.destroy();
    }

    // TUTORIAL
    private _onTutorialUpdate(tutorial: TutorialModel): void {
        tutorial ? this._buildTutorial() : this._destroyTutorial();
    }

    private _buildTutorial(): void {
        this.setChild('tutorial', (this._tutorial = new TutorialView()));
    }

    private _destroyTutorial(): void {
        this._tutorial.destroy();
    }
}
