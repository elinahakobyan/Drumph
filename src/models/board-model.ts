import { lego } from '@armathai/lego';
import { levelLength, levels, padsConfigs, timerDellay } from '../constants/constants';
import { BoardModelEvent } from '../events/model';
import { ProgressUpdateViewEvent } from '../events/view';
import { loopRunnable, removeRunnable } from '../utils';
import { ObservableModel } from './observable-model';
import { PadModel } from './pads/pad-model';

export enum BoardState {
    unknown = 'unknown',
    play = 'play',
    imitation = 'imitation',
    tutorial = 'tutorial',
    passive = 'passive',
    showResult = 'showResult',
}
export const duration = 1.5;
export class BoardModel extends ObservableModel {
    private _state = BoardState.unknown;
    private _visibilityRunnable: Runnable;
    private _timerPRunnable: Runnable;

    private _pads: Map<string, PadModel> = null;
    private _level: number = null;
    private _timer: BoardTimer = null;
    private _progressStepCount: number = null;
    private _progress: number = null;
    private _progressStep: number = null;
    private _levelPattern: string[] = null;
    private _imitacia = false;
    private _isEntryTruePad = false;
    private _levelConstInterval = 0;
    private _score = 0;

    public constructor() {
        super('BoardModel');
        lego.event.on(BoardModelEvent.levelUpdate, this._onLevelUpdate, this);
        this.makeObservable();
    }

    public get state(): BoardState {
        return this._state;
    }

    public set state(value: BoardState) {
        this._state = value;
    }

    public get timer(): BoardTimer {
        return this._timer;
    }

    public get score(): number {
        return this._score;
    }

    public get imitacia(): boolean {
        return this._imitacia;
    }

    public set imitacia(value: boolean) {
        this._imitacia = value;
    }

    public get level(): number {
        return this._level;
    }

    public set level(value: number) {
        this._level = value;
    }

    public get pads(): Map<string, PadModel> {
        return this._pads;
    }

    public get levelPattern(): string[] {
        return this._levelPattern;
    }

    public get progressStepCount(): number {
        return this._progressStepCount;
    }

    public get progress(): number {
        return this._progress;
    }

    public initialize(): void {
        this._state = BoardState.passive;
        this._createPads();
        this._createlevelPattern();
    }

    public checkPad(padUUid: string): void {
        const entryTimer = this._timer.entryTimer;

        this._isEntryTruePad ? false : this._checkIsTruePad(padUUid, entryTimer);
    }

    public startImitation(): void {
        lego.event.emit(ProgressUpdateViewEvent.start, false);

        this._onProgressStepCountUpdate();
        lego.event.emit(ProgressUpdateViewEvent.update, {
            pads: [this._levelPattern[0]],
            state: BoardState.imitation,
        });

        this._levelPattern.shift();

        this._visibilityRunnable = loopRunnable(this._levelConstInterval, this._progressEmitter, this);
    }

    public startPlayLevel(): void {
        !this._progress ? this._createlevelPattern() : false;
        lego.event.emit(ProgressUpdateViewEvent.start, false);
        this._onProgressStepCountUpdate();
        lego.event.emit(ProgressUpdateViewEvent.update, {
            pads: this._levelPattern[this._progress * this._levelPattern.length - 1],
            state: BoardState.play,
        });
        console.warn(this._progress * this._levelPattern.length);

        this._onTimerStart();
        this._visibilityRunnable = loopRunnable(this._levelConstInterval, this._progressPlayEmitter, this);
    }

    private _progressEmitter(): void {
        if (this._levelPattern.length > 0) {
            this._onProgressUpdate();
            lego.event.emit(ProgressUpdateViewEvent.update, {
                pads: [this._levelPattern[0]],
                state: BoardState.imitation,
            });
            this._levelPattern.shift();
        } else {
            removeRunnable(this._visibilityRunnable);
            lego.event.emit(ProgressUpdateViewEvent.finish, true);
            this._progress = null;
            this._progressStep = null;
        }
    }

    private _progressPlayEmitter(): void {
        if (this._progress < 1) {
            this._onProgressUpdate();
            lego.event.emit(ProgressUpdateViewEvent.update, {
                pads: this._levelPattern[this._progress * this._levelPattern.length - 1],
                state: BoardState.play,
            });
            console.warn(this._progress * this._levelPattern.length);
        } else {
            removeRunnable(this._visibilityRunnable);
            lego.event.emit(ProgressUpdateViewEvent.finish, true);
        }
    }

    private _checkIsTruePad(padUUid: string, entryTimer: number): void {
        //
        const pointers = this._timer.pointers;
        for (let i = 0; i < pointers.length; i++) {
            //
            if (padUUid === pointers[i].padUUid) {
                if (
                    this._levelConstInterval >= pointers[i].position - entryTimer &&
                    pointers[i].position - entryTimer >= 0
                ) {
                    // console.warn('asasas');
                    this._isEntryTruePad = true;
                    this._checkscore(pointers[i].position - entryTimer);
                    return;
                }
            }
        }
    }

    private _checkscore(entryTimer: number): void {
        const x = entryTimer / this._levelConstInterval;

        this._score += x / this._levelPattern.length;
        //
    }

    private _createPads(): void {
        const pads = new Map();
        const padsConfig = padsConfigs;
        padsConfig.map((padConfig) => {
            const padModel = new PadModel(padConfig);
            pads.set(padModel.name, padModel);
        });
        this._pads = pads;
    }

    private _onLevelUpdate(level: number): void {
        this._level = level;
        this._createlevelPattern();
        this._state = BoardState.tutorial;
    }

    private _createlevelPattern(): void {
        const levelPads = levels[this._level - 1];
        this._levelPattern ? (this._levelPattern.length = 0) : (this._levelPattern = []);
        const levelPattern: string[] = [];
        levelPads.forEach((levelPads) => {
            levelPattern.push(`pad_${levelPads.row}_${levelPads.col}`);
        });
        this._levelPattern = levelPattern;
        this._levelConstInterval = levelLength / this._levelPattern.length;
    }

    private _onProgressStepCountUpdate(): void {
        this._levelPattern.length > 0
            ? (this._progressStepCount = 1 / this._levelPattern.length)
            : (this._progressStepCount = 0);
        !this._progressStep ? (this._progressStep = this._progress = this._progressStepCount) : false;
    }

    private _onProgressUpdate(): void {
        this._progress += this._progressStep;
    }

    private _onTimerUpdate(): void {
        if (this._timer.entryTimer >= this._timer.end) {
            removeRunnable(this._timerPRunnable);
            return;
        }
        this._timer.entryTimer += timerDellay;
        this._timer.entryTimer % this._levelConstInterval === 0
            ? (this._isEntryTruePad = false)
            : (this._isEntryTruePad = true);
    }

    private _onTimerStart(): void {
        this._timer = { start: 0, entryTimer: 0, end: levelLength, pointers: [] };

        for (let index = 1; index <= this._levelPattern.length; index++) {
            this._timer.pointers.push({
                padUUid: this._levelPattern[index - 1],
                position: index * this._levelConstInterval,
            });
        }

        this._timerPRunnable = loopRunnable(timerDellay, this._onTimerUpdate, this);
    }
}
