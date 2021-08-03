import { delayRunnable } from '../../utils';
import { ObservableModel } from '../observable-model';
export enum PadState {
    unknown = 'unknown',
    active = 'active',
    deactivate = 'deactivate',
    blocked = 'blocked',
    showHint = 'showHint',
    hideHint = 'hideHint',
}

export enum PadStatus {
    unknown = 'unknown',
    play = 'play',
}

export class PadModel extends ObservableModel {
    private _state: PadState = null;
    private _status: PadStatus = null;
    private _config: PadModelConfig;
    private _name: string;
    private _activeColor: number;
    private _passiveColor: number;
    public constructor(config: PadModelConfig) {
        super('PadModel');
        this._name = config.name;
        this._config = config;
        this._activeColor = config.colorActive;
        this._passiveColor = config.colorPassive;
        this.makeObservable();
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

    public runing(): void {
        this._status = PadStatus.play;
        delayRunnable(
            0.01,
            () => {
                this._status = PadStatus.unknown;
            },
            this,
        );
    }
    public initialize(): void {
        this._state = PadState.deactivate;
    }
}
