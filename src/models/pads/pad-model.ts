import { ObservableModel } from '../observable-model';
export enum PadState {
    unknown = 'unknown',
    active = 'active',
    passive = 'passive',
}

export class PadModel extends ObservableModel {
    private _state = PadState.unknown;
    private _config: PadModelConfig;
    public constructor(config: PadModelConfig) {
        super('BoardModel');
        this.makeObservable();
    }

    public get state(): PadState {
        return this._state;
    }

    public set state(value: PadState) {
        this._state = value;
    }

    public get color(): number {
        return this._config.colorPassive;
    }

    public get name(): string {
        return this._config.name;
    }

    public initialize(): void {
        this._state = PadState.passive;
    }
}
