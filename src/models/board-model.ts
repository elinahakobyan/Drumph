import { levelLength, levelOpenPads, levels, padsConfigs, timerDelay } from '../constants/constants';
import { loopRunnable, removeRunnable } from '../utils';
import { ObservableModel } from './observable-model';
import { BoardPadClickStatus, PadModel, PadState } from './pads/pad-model';

export enum BoardState {
    unknown = 'unknown',
    idle = 'idle',
    imitation = 'imitation',
    play = 'play',
    levelComplete = 'levelComplete',
}

export enum BoardStatus {
    start = 'start',
    finish = 'finish',
    unknown = 'unknown',
}

export const duration = 1.5;

export class BoardModel extends ObservableModel {
    protected $currentScore = 0;
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

    public getPadByUuid(padUUid: string): PadModel {
        let p;
        this._pads.forEach((pad) => {
            if (pad.uuid == padUUid) {
                p = pad;
            }
        });

        return p;
    }

    ///initialize
    public initialize(): void {
        this._state = BoardState.idle;
        this._createPads();
        // this._createLevelPattern();
    }

    public destroy(): void {
        this._score && this._destroyScore();
        this._pads.forEach((p) => p.destroy());
        removeRunnable(this._timerPRunnable);
        removeRunnable(this._visibilityRunnable);
        super.destroy();
    }

    ///load new level
    public onLevelUpdate(level = 1): void {
        this._progress = null;
        this._level = level;
        this._state = BoardState.idle;
        this._createLevelPattern();
    }

    public rebuildLevel(): void {
        this._score = null;
        this._localScore = null;
        if (this._levelPattern) {
            this._levelPattern.forEach((levelPads) => {
                this._getPads(levelPads).state = PadState.blocked;
            });
            this._levelPattern.length = 0;
        }
    }

    /// start imitiatia this level
    public startImitation(): void {
        this._onProgressStepCountUpdate();
        this._onTimerStart();
        this._getPads(this._levelPattern[this._progress * this._levelPattern.length]).state = PadState.showHint;
        this._getPads(this._levelPattern[this._progress * this._levelPattern.length]).running();
        this._visibilityRunnable = loopRunnable(this._levelConstInterval, this._progressEmitter, this);
        this._timerPRunnable = loopRunnable(timerDelay * levelLength, this._onTimerUpdate, this);
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
            this._getPads(this._levelPattern[this._progress * this._levelPattern.length]).running();
        } else if ((this._state = BoardState.play)) {
            if (padUUid === this._getPads(this._levelPattern[0]).uuid) {
                this._localScore = 1 / this._levelPattern.length;
                this.$currentScore = this._localScore;
                this._boardPadClickStatusUpdate(this._levelConstInterval, this._getPads(this._levelPattern[0]));
            } else {
                this._boardPadClickStatusUpdate(-1, this._getPads(this._levelPattern[0]));
                this._localScore = 0;
            }
        }
    }

    ///counts the level score
    public checkLevelScore(): void {
        this._score = Math.floor(this.$currentScore * 100);
        this.nextToState();
    }

    public showAnimation(padUuid: string): void {
        this._pads.forEach((pad) => {
            if (pad.uuid == padUuid) {
                pad.state = PadState.animate;
            }
        });
    }

    ///return padModel by name or id
    private _getPads(padsUUid: string): PadModel {
        return this._pads.get(padsUUid);
    }

    private _destroyScore(): void {
        this._score = null;
    }

    //update progress or \ updating loop
    private _progressEmitter(): void {
        this._onProgressUpdate();
        if (this._progress < 1) {
            console.warn(this._getPads(this._levelPattern[this._progress * this._levelPattern.length - 1]));
            this._getPads(this._levelPattern[this._progress * this._levelPattern.length - 1]).state = PadState.hideHint;
            this._state === BoardState.imitation
                ? this._getPads(this._levelPattern[this._progress * this._levelPattern.length]).running()
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
        const entryTimer = this._entryTimer;
        const pointers = this._timer.pointers;
        return;
        for (let i = 0; i < pointers.length; i++) {
            //
            if (padUUid === this._getPads(pointers[i].padUUid).uuid) {
                if (
                    this._levelConstInterval >= pointers[i].position - entryTimer &&
                    pointers[i].position - entryTimer >= 0
                ) {
                    console.warn(pointers[i].position, entryTimer);

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
        this.$currentScore += x / this._levelPattern.length;
        // this._isEntryTruePad = false;
        //
    }

    ///create pads
    private _createPads(): void {
        const pads = new Map();
        const padsConfig = padsConfigs;
        padsConfig.map((padConfig, index) => {
            const padModel = new PadModel(padConfig, index);
            pads.set(padModel.name, padModel);
        });

        this._pads = pads;
    }

    //create pattern in this level
    private _createLevelPattern(): void {
        // const levelPads = levelOpenPads[2];
        const levelPads = levelOpenPads[this._level - 1];
        this._levelPattern ? (this._levelPattern.length = 0) : (this._levelPattern = []);
        const levelPattern: string[] = [];

        levelPads.forEach((levelPads) => {
            this._getPads(`pad_${levelPads.row}_${levelPads.col}`).state = PadState.active;
        });
        levels[this._level - 1].forEach((levelPads) => {
            levelPattern.push(`pad_${levelPads.row}_${levelPads.col}`);
        });
        console.warn(levelPattern);
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
            padModel.accuracy = BoardPadClickStatus.miss;
        } else if (value > 0.01 && value < 0.4) {
            padModel.accuracy = BoardPadClickStatus.bad;
        } else if (value >= 0.4 && value < 0.7) {
            padModel.accuracy = BoardPadClickStatus.good;
        } else if (value >= 0.7 && value <= 1) {
            padModel.accuracy = BoardPadClickStatus.perfect;
        }
    }

    private _onTimerUpdate(): void {
        this._timer.entryTimer += Math.round(4 * timerDelay * 100) / 100;
        this._timer.entryTimer = Math.floor(this._timer.entryTimer * 100) / 100;
        this._entryTimer = this._timer.entryTimer;

        if (this._timer.entryTimer >= this._timer.end || this._timer.entryTimer + timerDelay > this._timer.end) {
            removeRunnable(this._timerPRunnable);
            return;
        } else if (
            this._timer.entryTimer % (levelLength / this._levelPattern.length) < 0.3 ||
            (this._timer.entryTimer + timerDelay) % (levelLength / this._levelPattern.length) < timerDelay
        ) {
            this._isEntryTruePad = false;
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
                position: Math.round(4 * (index - 1) * this._levelConstInterval * 100) / 100,
            });
        }

        // this._timerPRunnable = loopRunnable(timerDellay, this._onTimerUpdate, this);
    }
}
