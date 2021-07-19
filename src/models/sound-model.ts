import { ObservableModel } from './observable-model';

export class SoundModel extends ObservableModel {
    private _mute: boolean = null;
    private _icon: boolean = null;

    public constructor() {
        super('SoundModel');
        this.makeObservable();
    }

    public get mute(): boolean {
        return this._mute;
    }

    public get icon(): boolean {
        return this._icon;
    }

    public initialize(): void {
        this._mute = false;
    }

    public toggleMute(): void {
        this._mute = !this._mute;
    }
}
