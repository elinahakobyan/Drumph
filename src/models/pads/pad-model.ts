import { ObservableModel } from '../observable-model';
export enum PadState {
    unknown = 'unknown',
    active = 'active',
    passive = 'passive',
}

export class PadModel extends ObservableModel {
    private _state = PadState.unknown;
    private _config: PadModelConfig;
    private _name: string;
    private _activeColor: number;
    private _passiveColor: number;
    public constructor(config: PadModelConfig) {
        super('BoardModel');
        this._name = config.name;
        this._activeColor = config.colorAtive;
        this._passiveColor = config.colorPassive;
        this.makeObservable();
    }

    public get state(): PadState {
        return this._state;
    }

    public set state(value: PadState) {
        this._state = value;
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

    public initialize(): void {
        this._state = PadState.passive;
    }
}
