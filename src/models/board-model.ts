import { levelLength, levelOpenPads, levels, padsConfigs, timerDelay } from '../constants/constants';
import { loopRunnable, removeRunnable } from '../utils';
import { ObservableModel } from './observable-model';
import { BoardPadClickStatus, PadModel, PadState } from './pads/pad-model';

export enum BoardState {
    unknown = 'unknown',
    idle = 'idle',
    imitation = 'imitation',
    play = 'play',
    recording = 'recording',
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
    private _startRecordingTime: number;

    private _timerPRunnable: Runnable;
    private _clickCount = 0;
    private _padsCount = 0;

    private _pads: Map<string, PadModel> = null;
    private _level: number = null;
    private _timer: BoardTimer = null;
    private _progressStepCount: number = null;
    private _progress: boolean;
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

    public set entryTimer(value: number) {
        this._entryTimer = value;
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

    public get progress(): boolean {
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
        this._progress = false;
        this._level = level;
        this._state = BoardState.idle;
        this._createLevelPattern();
    }

    public rebuildLevel(): void {
        this._score = null;
        this._clickCount = 0;
        this._padsCount = 0;
        this._localScore = null;
        if (this._levelPattern) {
            this._levelPattern.forEach((levelPads) => {
                this._getPads(levelPads).state = PadState.blocked;
            });
            this._levelPattern.length = 0;
        }
    }

    /// start imitation in current level
    public startImitation(): void {
        // this.state = BoardState.recording;
        // this._onProgressStepCountUpdate();
        this._onTimerStart();
        // this._getPads(this._levelPattern[this._progress * this._levelPattern.length]).state = PadState.showHint;
        // this._getPads(this._levelPattern[this._progress * this._levelPattern.length]).running();

        // this._visibilityRunnable = loopRunnable(this._levelConstInterval, this._progressEmitter, this);
        this._timerPRunnable = loopRunnable(timerDelay * levelLength, this._onTimerUpdate, this);
    }

    //go to next  level
    public nextToState(): void {
        switch (this._state) {
            case BoardState.imitation:
                this._state = BoardState.play;
                this._progress = false;
                this.status = BoardStatus.start;
                break;
            case BoardState.play:
                this._state = BoardState.levelComplete;
                break;
        }
    }

    ///compare input padUUid and element on pattern starting from the second
    public checkPad = (padUUid: string): void => {
        console.warn('hasa');
        this._checkIsTruePad(padUUid, this._clickCount);
        this._clickCount += 1;
    };

    public showHintDuringGame = (): void => {
        this._padsCount = 0;
        this._showHint();
    };

    ///counts the level score
    public checkLevelScore(): void {
        // console.warn(this.$currentScore);
        this._score = Math.floor(this._localScore);
        this.nextToState();
    }

    public showAnimation(padUuid: string): void {
        this._pads.forEach((pad) => {
            if (pad.uuid == padUuid) {
                pad.state = PadState.animate;
                pad.state = PadState.active;
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

    private _showHint(): void {
        if (this._timer.pointers[this._padsCount]) {
            if (this._entryTimer >= this._timer.pointers[this._padsCount].position - 0.05) {
                this._progressEmitter();
            }
        } else if (this._entryTimer === 3.21) {
            this._progress = true;
        } else {
            this._getPads(this._levelPattern[this._padsCount - 1]).state = PadState.hideHint;
            // this._padsCount = 0;
        }
    }

    //update progress or remove updating loop
    private _progressEmitter(): void {
        if (this._levelPattern[this._padsCount - 1]) {
            this._getPads(this._levelPattern[this._padsCount - 1]).state = PadState.hideHint;
        }

        this._state === BoardState.imitation ? this._getPads(this._levelPattern[this._padsCount]).running() : false;
        this._getPads(this._levelPattern[this._padsCount]).state = PadState.showHint;
        this._padsCount += 1;
        // } else {
        //     this._getPads(this._levelPattern[this._padsCount - 1]).state = PadState.hideHint;
        //     removeRunnable(this._visibilityRunnable);
        //     // // this.state = BoardState.play;
        //     this._padsCount = 0;
        //     this._progress = null;
        //     this._progressStep = null;
        // }
    }

    //check is true input pad
    private _checkIsTruePad(padUUid: string, count: number): void {
        //
        const entryTimer = this._entryTimer;
        const pointers = this._timer.pointers;

        if (pointers[count] && this._getPads(pointers[count].padUUid)) {
            if (padUUid === this._getPads(pointers[count].padUUid).uuid) {
                console.warn(pointers[count].position, 'targetTime');
                console.warn(entryTimer, 'clickTime');

                this._localScore += this._boardPadClickStatusUpdate(
                    pointers[count].position - entryTimer,
                    this._getPads(pointers[count].padUUid),
                );
                return;
                // }
            } else {
                this._localScore += this._boardPadClickStatusUpdate(-1, this._getPads(pointers[count].padUUid));
            }
        }
    }

    ///counts the this part score on level
    private _checkScore(entryTimer: number): void {
        // const x = entryTimer / this._levelConstInterval;
        // this.$currentScore += x / this._levelPattern.length;
        // this._isEntryTruePad = false;
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
        this._levelPattern = levelPattern;
        this._levelConstInterval = levelLength / this._levelPattern.length;
    }

    ///counts the proressStep and progress step count in this level
    private _onProgressStepCountUpdate(): void {
        // this._levelPattern.length > 0
        //     ? (this._progressStepCount = 3.2 / this._levelPattern.length - 0.2)
        //     : (this._progressStepCount = 0);
        // !this._progressStep ? (this._progressStep = this._progressStepCount) : false;
        // this._progress = 0;
    }

    private _onProgressUpdate(): void {
        // this._progress += this._progressStep;
    }

    private _boardPadClickStatusUpdate(delta: number, padModel: PadModel): number {
        // const value = delta / this._levelConstInterval;
        let winPercentage = 0;
        const maxValueInPercentage = 100 / this._levelPattern.length;
        // const value = delta / this._levelConstInterval;
        const value = 1 - Math.abs(delta / this._levelConstInterval);
        console.warn(value, 'value');

        if (delta == -1 || value < 0) {
            padModel.showPrompt(BoardPadClickStatus.miss);
            winPercentage = 0;
            console.warn(BoardPadClickStatus.miss);
        } else if (value > 0.01 && value < 0.4) {
            console.warn(BoardPadClickStatus.bad);
            padModel.showPrompt(BoardPadClickStatus.bad);
            winPercentage = maxValueInPercentage - Math.abs(delta / this._levelConstInterval) * maxValueInPercentage;
        } else if (value >= 0.4 && value < 0.7) {
            console.warn(BoardPadClickStatus.good);
            padModel.showPrompt(BoardPadClickStatus.good);
            winPercentage = maxValueInPercentage - Math.abs(delta / this._levelConstInterval) * maxValueInPercentage;
        } else if (value >= 0.7 && value <= 1) {
            console.warn(BoardPadClickStatus.perfect);
            padModel.showPrompt(BoardPadClickStatus.perfect);
            winPercentage = maxValueInPercentage;
        }

        return winPercentage;
    }

    private _onTimerUpdate(): void {
        this._timer.entryTimer += Math.round(4 * timerDelay * 100) / 100;
        this._timer.entryTimer = Math.floor(this._timer.entryTimer * 100) / 100;

        this._entryTimer = this._timer.entryTimer;
        // if (this._entryTimer === 3.21) {
        //     this._progress = true;
        // }

        this._showHint();

        if (this._timer.entryTimer >= this._timer.end || this._timer.entryTimer + timerDelay > this._timer.end) {
            removeRunnable(this._timerPRunnable);
            return;
        } else if (
            this._timer.entryTimer % (levelLength / this._levelPattern.length) < 0.3 ||
            (this._timer.entryTimer + timerDelay) % (levelLength / this._levelPattern.length) < timerDelay
        ) {
            this._isEntryTruePad = false;
        }
    }

    private _onTimerStart(): void {
        // this._startRecordingTime = Date.now();

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
