import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import gsap from 'gsap/gsap-core';
import { NineSlicePlane } from 'pixi.js';
import { HintComponent } from '../components/hint-component';
import { LogoComponent } from '../components/logo-component';
import { SoundToggleComponent } from '../components/sound-toggle-component';
import { TutorialView } from '../components/tutorial-view';
import { getForegroundGridConfig } from '../constants/configs/grid-configs';
import { BoardModelEvent, PlayableModelEvent, SoundModelEvent } from '../events/model';
import { PlayViewEvent } from '../events/view';
import { HintModel } from '../models/hint-model';
import { PlayableState } from '../models/playable-model';
import { TutorialModel } from '../models/tutorial-model';
import { getParams, tweenToCell } from '../utils';
import { ScoreComponent } from './score-component';

export class ForegroundView extends PixiGrid {
    private _logo: LogoComponent;
    private _sound: SoundToggleComponent;
    private _hint: HintComponent;
    private _tutorial: TutorialView;
    private _scorePopUp: NineSlicePlane;
    private _score: number;

    public constructor() {
        super();
        this.name = 'ForegroundView';

        lego.event
            .on(PlayableModelEvent.stateUpdate, this._onPlayableStateUpdate, this)
            .on(PlayableModelEvent.hintUpdate, this._onHintUpdate, this)
            .on(SoundModelEvent.iconUpdate, this._onSoundIconUpdate, this)
            .on(PlayableModelEvent.tutorialUpdate, this._onTutorialUpdate, this)
            .on(BoardModelEvent.scoreUpdate, this._onBoardScoreUpdate, this);
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
                this._replaceLogo();
                break;
            default:
        }
    }

    //LOGO

    private _build(): void {
        this._buildLogo();
    }

    private _buildLogo(): void {
        this.setChild('logo', (this._logo = new LogoComponent()));
        getParams().logo.value ? (this._logo.visible = true) : (this._logo.visible = false);
    }

    private _replaceLogo(): void {
        tweenToCell(this, this._logo, 'cta_logo');
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

    // score-component

    private _buildScoreComponent(scoreNumber: number): void {
        const score = new ScoreComponent(scoreNumber);
        score.on('scoreBtnClick', (text) => {
            this._hideScore();
            lego.event.emit(PlayViewEvent.onScoreBtnClick, text);
        });
        this.setChild('score', (this._scorePopUp = score));
        this._showScore();
    }

    private _showScore(): void {
        const posY = this._scorePopUp.position.y;
        this._scorePopUp.position.y = 800;
        gsap.to(this._scorePopUp.position, {
            y: posY,
            duration: 0.8,
        });
    }

    private _hideScore(): void {
        gsap.to(this._scorePopUp.position, {
            y: -800,
            duration: 0.8,
        });
        // }).eventCallback('onComplete', this._destroyScoreComponent.bind(this));
    }

    private _onBoardScoreUpdate(score: number): void {
        // score ? true : this._destroyScoreComponent();
        if (score > 1 || score == 0) {
            this._buildScoreComponent(score);
        }
    }

    private _destroyScoreComponent(): void {
        this._scorePopUp.destroy();
        this._scorePopUp = null;
    }
}
