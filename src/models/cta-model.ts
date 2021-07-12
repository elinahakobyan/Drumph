import { delayRunnable, getParams, removeRunnable } from '../utils';
import { ObservableModel } from './observable-model';

export enum CtaRevelationReason {
    unknown,
    idle,
    skip,
    complete,
}

export class CtaModel extends ObservableModel {
    private _revelation = false;
    private _revealed = false;
    private _revelationReason: CtaRevelationReason = CtaRevelationReason.unknown;
    private _revelationRunnable: Runnable;
    private _revelRunnable: Runnable;

    public constructor() {
        super('CtaModel');
        this.makeObservable();
        __INSTANT_AD_TIMER_START__ && this.interaction();
    }

    public get revelation(): boolean {
        return this._revelation;
    }

    public get revealed(): boolean {
        return this._revealed;
    }

    public get revelationReason(): CtaRevelationReason {
        return this._revelationReason;
    }

    public interaction(): void {
        removeRunnable(this._revelationRunnable);
        this._revelationRunnable = delayRunnable(
            getParams().idleTimeToCta.value,
            this.reveal,
            this,
            CtaRevelationReason.idle,
            0,
        );
    }

    public destroy(): void {
        removeRunnable(this._revelationRunnable);
        removeRunnable(this._revelRunnable);
    }

    public reveal(reason: CtaRevelationReason, duration = 0): void {
        removeRunnable(this._revelationRunnable);
        this._revelRunnable = delayRunnable(duration, () => {
            this._revealed = true;
        });

        this._revelationReason = reason;
        this._revelation = true;
    }
}
