import { delayRunnable, getParams, removeRunnable } from '../utils';
import { ObservableModel } from './observable-model';

export class HintModel extends ObservableModel {
    private _visible = false;
    private _visibilityRunnable: Runnable;

    public constructor() {
        super('HintModel');
        this.makeObservable();
    }

    public get visible(): boolean {
        return this._visible;
    }

    public set visible(value: boolean) {
        this._visible = value;
        this._stopVisibilityTimer();
    }

    public initialize(): void {
        this._startVisibilityTimer();
    }

    public destroy(): void {
        this._stopVisibilityTimer();
    }

    public resetVisibilityTimer(): void {
        this._stopVisibilityTimer();
        this._startVisibilityTimer();
    }

    private _startVisibilityTimer(): void {
        this._visibilityRunnable = delayRunnable(getParams().idleTimeToHint.value, () => {
            this._visible = true;
        });
    }

    private _stopVisibilityTimer(): void {
        removeRunnable(this._visibilityRunnable);
    }
}
