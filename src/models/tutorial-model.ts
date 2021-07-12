import { delayRunnable, getParams, removeRunnable } from '../utils';
import { ObservableModel } from './observable-model';

export class TutorialModel extends ObservableModel {
    private _complete = false;
    private _completeDelayRunnable: Runnable;

    public constructor() {
        super('TutorialModel');
        this.makeObservable();
    }

    public get complete(): boolean {
        return this._complete;
    }

    public set complete(value: boolean) {
        this._complete = value;
    }

    public initialize(): void {
        super.initialize();
        this._startCompleteTimer();
    }

    public destroy(): void {
        super.destroy();
        this._stopCompleteTimer();
    }

    public resetCompleteTimer(): void {
        this._stopCompleteTimer();
        this._startCompleteTimer();
    }

    private _startCompleteTimer(): void {
        this._completeDelayRunnable = delayRunnable(getParams().tutorialTime.value, () => {
            this._complete = true;
        });
    }

    private _stopCompleteTimer(): void {
        removeRunnable(this._completeDelayRunnable);
    }
}
