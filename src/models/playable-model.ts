import { CtaModel } from './cta-model';
import { HintModel } from './hint-model';
import { ObservableModel } from './observable-model';
import { PersistentCtaModel } from './persistent-cta-model';
import { SoundModel } from './sound-model';
import { TutorialModel } from './tutorial-model';

export enum PlayableState {
    unknown,
    play,
    ctaRevelation,
    cta,
    retry,
}

export class PlayableModel extends ObservableModel {
    private _cta: CtaModel = null;
    private _hint: HintModel = null;
    private _tutorial: TutorialModel = null;
    private _persistentCta: PersistentCtaModel = null;
    private _sound: SoundModel = null;
    private _state: PlayableState = PlayableState.unknown;
    private _retriesCount = 0;

    public constructor() {
        super('PlayableModel');
        this.makeObservable();
    }

    public get state(): PlayableState {
        return this._state;
    }

    public set state(value: PlayableState) {
        this._state = value;
    }

    public get hint(): HintModel {
        return this._hint;
    }

    public get tutorial(): TutorialModel {
        return this._tutorial;
    }

    public get persistentCta(): PersistentCtaModel {
        return this._persistentCta;
    }

    public get cta(): CtaModel {
        return this._cta;
    }

    public get sound(): SoundModel {
        return this._sound;
    }

    public get retriesCount(): number {
        return this._retriesCount;
    }

    public set retriesCount(value: number) {
        this._retriesCount = value;
    }

    public destroy(): void {
        this._cta && this.destroyCtaModel();
        this._hint && this.destroyHintModel();
        this._tutorial && this.destroyTutorialModel();
        this._persistentCta && this.destroyPersistentCtaModel();
    }

    // CTA
    public initializeCtaModel(): void {
        this._cta = new CtaModel();
        this._cta.initialize();
    }

    public destroyCtaModel(): void {
        this._cta.destroy();
        this._cta = null;
    }

    // HINT
    public initializeHintModel(): void {
        this._hint = new HintModel();
        this._hint.initialize();
    }

    public destroyHintModel(): void {
        this._hint.destroy();
        this._hint = null;
    }

    // TUTORIAL
    public initializeTutorialModel(): void {
        this._tutorial = new TutorialModel();
        this._tutorial.initialize();
    }

    public destroyTutorialModel(): void {
        return;
        this._tutorial.destroy();
        this._tutorial = null;
    }

    // PERSISTENT_CTA
    public initializePersistentCtaModel(): void {
        this._persistentCta = new PersistentCtaModel();
        this._persistentCta.initialize();
    }

    public destroyPersistentCtaModel(): void {
        this._persistentCta.destroy();
        this._persistentCta = null;
    }

    // SOUND
    public initializeSoundModel(): void {
        this._sound = new SoundModel();
        this._sound.initialize();
    }

    public destroySoundModel(): void {
        this._sound.destroy();
        this._sound = null;
    }
}
