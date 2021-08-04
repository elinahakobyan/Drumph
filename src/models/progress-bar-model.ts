import { ObservableModel } from './observable-model';

export class ProgressBarModel extends ObservableModel {
    private _progress: number;

    public constructor() {
        super('ProgressBarModel');
        this._progress = null;
        this.makeObservable();
    }

    // public get config(): CellConfig {
    //     return this._config;
    // }

    public get progress(): number {
        return this._progress;
    }

    public set progress(progress: number) {
        this._progress = progress;
    }

    public initialize(): void {
        //   const { initialProgress } = this._config;
        // this.updateProgress(initialProgress);
    }
}
