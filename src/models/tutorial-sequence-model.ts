import { ObservableModel } from './observable-model';

export class TutorialSequenceModel extends ObservableModel {
    private _index: number;
    private _complete: boolean;
    private _show: boolean;
    public constructor(private _config: { text: string; duration: number; clickToComplete: boolean }, index: number) {
        super('TutorialSequenceModel');

        this._index = index;
        this._complete = false;
        this._show = false;

        this.makeObservable('_complete', '_show');
    }

    public get config(): { text: string; duration: number; clickToComplete: boolean } {
        return this._config;
    }

    public get index(): number {
        return this._index;
    }

    public get complete(): boolean {
        return this._complete;
    }

    public set complete(value: boolean) {
        this._complete = value;
    }

    public get show(): boolean {
        return this._show;
    }

    public set show(value: boolean) {
        this._show = value;
    }
}
