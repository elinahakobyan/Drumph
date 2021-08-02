import { levelLength, levels, padsConfigs, timerDellay } from '../constants/constants';
import { loopRunnable, removeRunnable } from '../utils';
import { ObservableModel } from './observable-model';
import { PadModel, PadState } from './pads/pad-model';

export enum BoardState {
    unknown = 'unknown',
    play = 'play',
    imitation = 'imitation',
    idle = 'idle',
}

export enum BoardStatus {
    start = 'start',
    finish = 'finish',
    unknown = 'unknown',
}
export const duration = 1.5;

export class BoardModel extends ObservableModel {
    protected $score = 0;
    private _state = BoardState.unknown;
    private _status = BoardStatus.unknown;
    private _visibilityRunnable: Runnable;
    private _timerPRunnable: Runnable;

    private _pads: Map<string, PadModel> = null;
    private _level: number = null;
    private _timer: BoardTimer = null;
    private _progressStepCount: number = null;
    private _progress: number = null;
    private _progressStep: number = null;
    private _levelPattern: string[] = null;
    private _imitation = false;
    private _isEntryTruePad = false;
    private _levelConstInterval = 0;
    private _score: number = null;

    public constructor() {
        super('BoardModel');
        // lego.event.on(BoardModelEvent.levelUpdate, this._onLevelUpdate, this);
        this.makeObservable();
    }

    public get state(): BoardState {
        return this._state;
    }

    public set state(value: BoardState) {
        this._state = value;
    }

    public get status(): BoardStatus {
        return this._status;
    }

    public set status(value: BoardStatus) {
        this._status = value;
    }

    public get timer(): BoardTimer {
        return this._timer;
    }

    public get score(): number {
        return this._score;
    }

    public get imitation(): boolean {
        return this._imitation;
    }

    public set imitation(value: boolean) {
        this._imitation = value;
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
        this._state = BoardState.idle;
        this._createPads();
        this._createLevelPattern();
    }

    public nextToState(): void {
        // console.warn(this._state);
        switch (this._state) {
            case BoardState.imitation:
                this._state = BoardState.play;
                this.status = BoardStatus.start;
                break;
            case BoardState.play:
                this._state = BoardState.idle;
                break;
            // case BoardState.idle:
            //     this._state = BoardState.imitation;
            //     break;

            default:
                break;
        }
        // console.warn(this._state);
    }

    public checkPad = (padUUid: string): void => {
        // console.warn(this);
        console.warn(this._timer);

        this._isEntryTruePad ? false : this._checkIsTruePad(padUUid);
    };

    public checkLevelScore(): void {
        console.warn(this.$score);

        this._score = this.$score;
    }

    public onLevelUpdate(level = 1): void {
        this._level = level;
        this._createLevelPattern();
        this._state = BoardState.idle;
    }

    public startImitation(): void {
        // this._status = BoardStatus.start;
        this._onProgressStepCountUpdate();

        this._getPads(this._levelPattern[this._progress * this._levelPattern.length]).state = PadState.showHint;
        this._onTimerStart();
        this._visibilityRunnable = loopRunnable(this._levelConstInterval, this._progressEmitter, this);
    }

    private _getPads(padsUUid: string): PadModel {
        return this._pads.get(padsUUid);
    }

    private _progressEmitter(): void {
        this._onProgressUpdate();
        if (this._progress < 1) {
            this._getPads(this._levelPattern[this._progress * this._levelPattern.length - 1]).state = PadState.hideShow;
            this._getPads(this._levelPattern[this._progress * this._levelPattern.length]).state = PadState.showHint;
        } else {
            this._getPads(this._levelPattern[this._progress * this._levelPattern.length - 1]).state = PadState.hideShow;

            removeRunnable(this._visibilityRunnable);
            this.state = BoardState.play;
            this._progress = null;
            this._progressStep = null;
        }
    }

    private _checkIsTruePad(padUUid: string): void {
        //
        const entryTimer = this._timer.entryTimer;

        const pointers = this._timer.pointers;
        for (let i = 0; i < pointers.length; i++) {
            //
            if (padUUid === pointers[i].padUUid) {
                if (
                    this._levelConstInterval >= pointers[i].position - entryTimer &&
                    pointers[i].position - entryTimer >= 0
                ) {
                    this._isEntryTruePad = true;
                    this._checkScore(pointers[i].position - entryTimer);
                    return;
                }
            }
        }
    }

    private _checkScore(entryTimer: number): void {
        const x = entryTimer / this._levelConstInterval;

        this.$score += x / this._levelPattern.length;
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
        // console.warn(this._pads);
    }

    private _createLevelPattern(): void {
        const levelPads = levels[this._level - 1];
        this._levelPattern ? (this._levelPattern.length = 0) : (this._levelPattern = []);
        const levelPattern: string[] = [];
        levelPads.forEach((levelPads) => {
            levelPattern.push(`pad_${levelPads.row}_${levelPads.col}`);
            this._getPads(`pad_${levelPads.row}_${levelPads.col}`).state = PadState.active;
        });
        this._levelPattern = levelPattern;
        this._levelConstInterval = levelLength / this._levelPattern.length;
    }

    private _onProgressStepCountUpdate(): void {
        this._levelPattern.length > 0
            ? (this._progressStepCount = 1 / this._levelPattern.length)
            : (this._progressStepCount = 0);
        !this._progressStep ? (this._progressStep = this._progressStepCount) : false;
        this._progress = 0;
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
