import { levelLength, levels, padsConfigs, timerDellay } from '../constants/constants';
import { loopRunnable, removeRunnable } from '../utils';
import { ObservableModel } from './observable-model';
import { BoardPadClickStatus, PadModel, PadState } from './pads/pad-model';

export enum BoardState {
    unknown = 'unknown',
    play = 'play',
    imitation = 'imitation',
    idle = 'idle',
    levelComplete = 'levelComplete',
}

export enum BoardStatus {
    start = 'start',
    finish = 'finish',
    unknown = 'unknown',
}

export const duration = 1.5;

export class BoardModel extends ObservableModel {
    protected $carentScore = 0;
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
    private _entryTimer: number = null;
    private _localScore = 0;

    public constructor() {
        super('BoardModel');
        // lego.event.on(BoardModelEvent.levelUpdate, this._onLevelUpdate, this);
        this.makeObservable();
    }

    public get entryTimer(): number {
        return this._entryTimer;
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

    ///initialize
    public initialize(): void {
        this._state = BoardState.idle;
        this._createPads();
        this._createLevelPattern();
    }

    public destroy(): void {
        this._score && this._destroyScore();
    }

    ///load new level
    public onLevelUpdate(level = 1): void {
        this._level = level;
        this._createLevelPattern();
        this._state = BoardState.idle;
    }

    /// start imitiatia this level
    public startImitation(): void {
        this._onProgressStepCountUpdate();
        this._onTimerStart();
        this._getPads(this._levelPattern[this._progress * this._levelPattern.length]).state = PadState.showHint;
        this._getPads(this._levelPattern[this._progress * this._levelPattern.length]).runing();
        this._visibilityRunnable = loopRunnable(this._levelConstInterval, this._progressEmitter, this);
        this._timerPRunnable = loopRunnable(timerDellay * levelLength, this._onTimerUpdate, this);
    }

    //go to next  level
    public nextToState(): void {
        switch (this._state) {
            case BoardState.imitation:
                this._state = BoardState.play;
                this.status = BoardStatus.start;
                break;
            case BoardState.play:
                this._state = BoardState.levelComplete;
                break;
        }
    }

    ///compare input padUUid and element on patern starting from the second
    public checkPad = (padUUid: string): void => {
        this._isEntryTruePad === false ? this._checkIsTruePad(padUUid) : false;
    };

    ///compare input padUUid and element on patern first
    public onStartPlay(padUUid: string): void {
        if (this._state === BoardState.imitation) {
            this._getPads(this._levelPattern[this._progress * this._levelPattern.length]).runing();
        } else if ((this._state = BoardState.play)) {
            if (padUUid === this._getPads(this._levelPattern[0]).uuid) {
                this._localScore = 1 / this._levelPattern.length;
                this.$carentScore = this._localScore;
                this._boardPadClickStatusUpdate(this._levelConstInterval, this._getPads(this._levelPattern[0]));
            } else {
                this._boardPadClickStatusUpdate(-1, this._getPads(this._levelPattern[0]));
                this._localScore = 0;
            }
        }
    }

    ///counts the level score
    public checkLevelScore(): void {
        console.warn('----------------------------------');

        this._score = Math.floor(this.$carentScore * 100);
        this.nextToState();
    }

    ///return padModel by name or id
    private _getPads(padsUUid: string): PadModel {
        return this._pads.get(padsUUid);
    }

    private _destroyScore(): void {
        console.warn('destroyScore');

        this._score = null;
    }

    //update progress or remove updateing loop
    private _progressEmitter(): void {
        this._onProgressUpdate();
        console.warn(this._progress);
        if (this._progress < 1) {
            this._getPads(this._levelPattern[this._progress * this._levelPattern.length - 1]).state = PadState.hideHint;
            this._state === BoardState.imitation
                ? this._getPads(this._levelPattern[this._progress * this._levelPattern.length]).runing()
                : false;
            this._getPads(this._levelPattern[this._progress * this._levelPattern.length]).state = PadState.showHint;
        } else {
            this._getPads(this._levelPattern[this._progress * this._levelPattern.length - 1]).state = PadState.hideHint;

            removeRunnable(this._visibilityRunnable);
            // this.state = BoardState.play;
            this._progress = null;
            this._progressStep = null;
        }
    }

    //check is true input pad
    private _checkIsTruePad(padUUid: string): void {
        //
        const entryTimer = this._timer.entryTimer;
        const pointers = this._timer.pointers;
        for (let i = 0; i < pointers.length; i++) {
            //
            if (padUUid === this._getPads(pointers[i].padUUid).uuid) {
                if (
                    this._levelConstInterval >= pointers[i].position - entryTimer &&
                    pointers[i].position - entryTimer >= 0
                ) {
                    this._isEntryTruePad = true;
                    this._checkScore(pointers[i].position - entryTimer);
                    this._boardPadClickStatusUpdate(
                        pointers[i].position - entryTimer,
                        this._getPads(pointers[i].padUUid),
                    );
                    return;
                }
            }
        }
        this._boardPadClickStatusUpdate(
            -1,
            this._getPads(this._levelPattern[this._progress * this._levelPattern.length]),
        );
    }

    ///counts the this part score on level
    private _checkScore(entryTimer: number): void {
        const x = entryTimer / this._levelConstInterval;
        this.$carentScore += x / this._levelPattern.length;
        // this._isEntryTruePad = false;
        //
    }

    ///create pads
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

    //create pattern in this level
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

    ///counts the proressStep and progress step count in this level
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

    private _boardPadClickStatusUpdate(delta: number, padModel: PadModel): void {
        // this._progress += this._progressStep;
        const value = delta / this._levelConstInterval;
        if (delta == -1) {
            console.warn('pstcrir');
            padModel.accuracy = BoardPadClickStatus.miss;
        } else if (value > 0.01 && value < 0.4) {
            padModel.accuracy = BoardPadClickStatus.bad;

            console.warn('wata', delta);
        } else if (value >= 0.4 && value < 0.7) {
            padModel.accuracy = BoardPadClickStatus.good;

            console.warn('budulot');
        } else if (value >= 0.7 && value <= 1) {
            padModel.accuracy = BoardPadClickStatus.perfect;

            console.warn('tuyna');
        }
    }

    private _onTimerUpdate(): void {
        this._timer.entryTimer += timerDellay;
        // console.warn(this._timer.entryTimer, this._timer.end);
        if (this._timer.entryTimer >= this._timer.end || this._timer.entryTimer + timerDellay > this._timer.end) {
            removeRunnable(this._timerPRunnable);

            return;
        }
        // this._timer.entryTimer += timerDellay;
        // this._timer.entryTimer += timerDellay;
        // console.info(this._timer.entryTimer, this._timer.end, timerDellay);

        // this._timer.entryTimer = Math.floor(this._timer.entryTimer * 100) / 100;
        // // this._entryTimer < 1
        // //     ? (this._entryTimer = this._timer.entryTimer / (levelLength - levelLength / this._levelPattern.length))
        // //     : false;

        // // console.info(this.timer.pointers);
        // if (this.state === BoardState.play && this.timer.entryTimer % this._levelConstInterval === 0) {
        //     this._isEntryTruePad = false;
        // }
    }

    private _onTimerStart(): void {
        this._timer = { start: 0, entryTimer: 0, end: levelLength, pointers: [] };
        this._entryTimer = 0;
        for (let index = 1; index <= this._levelPattern.length; index++) {
            this._timer.pointers.push({
                padUUid: this._levelPattern[index - 1],
                position: (index - 1) * this._levelConstInterval,
            });
        }

        // this._timerPRunnable = loopRunnable(timerDellay, this._onTimerUpdate, this);
    }
}
