import { delayRunnable, removeRunnable } from '../../utils';
import { ObservableModel } from '../observable-model';
export enum PadState {
    unknown = 'unknown',
    active = 'active',
    deactivate = 'deactivate',
    blocked = 'blocked',
    animate = 'animate',
    showHint = 'showHint',
    hideHint = 'hideHint',
}

export enum BoardPadClickStatus {
    unknown = 'unknown',
    perfect = 'Perfect',
    good = 'Good',
    bad = 'Bad',
    miss = 'Miss',
}

export enum PadStatus {
    unknown = 'unknown',
    play = 'play',
}

export class PadModel extends ObservableModel {
    private _state: PadState = null;
    private _status: PadStatus = null;
    private _config: PadModelConfig;
    private _accuracy = BoardPadClickStatus.unknown;
    private _coolDownRunnable: Runnable;

    private _index: number;
    private _name: string;
    private _activeColor: number;
    private _passiveColor: number;
    public constructor(config: PadModelConfig, index: number) {
        super('PadModel');
        this._index = index;
        this._name = config.name;
        this._config = config;
        this._activeColor = config.colorActive;
        this._passiveColor = config.colorPassive;
        this.makeObservable();
    }

    public get index(): number {
        return this._index;
    }

    public get accuracy(): BoardPadClickStatus {
        return this._accuracy;
    }

    public get state(): PadState {
        return this._state;
    }

    public set state(value: PadState) {
        this._state = value;
    }

    public get status(): PadStatus {
        return this._status;
    }

    public get config(): PadModelConfig {
        return this._config;
    }

    public get activeColor(): number {
        return this._activeColor;
    }

    public get passiveColor(): number {
        return this._passiveColor;
    }

    public get name(): string {
        return this._name;
    }

    public destroy(): void {
        removeRunnable(this._coolDownRunnable);
        super.destroy();
    }

    public running(): void {
        this._status = PadStatus.play;
        this._coolDownRunnable = delayRunnable(0.01, () => {
            this._status = PadStatus.unknown;
        });
    }

    public showPrompt(value: BoardPadClickStatus): void {
        this._accuracy = value;
        this._accuracy = null;
    }

    public initialize(): void {
        this._state = PadState.deactivate;
    }
}
