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
    aggressiveCtaComplete = 'aggressiveCtaComplete',
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
    private _clickCount = 0;
    private _padsCount = 0;

    private _pads: Map<string, PadModel> = null;
    private _level: number = null;
    private _timer: BoardTimer = null;
    private _progress: boolean;
    private _levelPattern: string[] = null;
    private _imitation = false;
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

    public get progress(): boolean {
        return this._progress;
    }

    public set progress(value: boolean) {
        this._progress = value;
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
        this._createLevelPattern();
        this._state = BoardState.idle;
    }

    public rebuildLevel(): void {
        this._score = null;
        this._clickCount = 0;
        this._padsCount = 0;
        this._entryTimer = 0;
        this._localScore = null;
        if (this._levelPattern) {
            this._levelPattern.forEach((levelPads) => {
                const pad = this.getPads(levelPads);
                pad.reset();
                pad.state = PadState.blocked;
            });
            this._levelPattern.length = 0;
        }
    }

    public startImitation(): void {
        this._onTimerStart();
        this._timerPRunnable = loopRunnable(timerDelay * levelLength, this._onTimerUpdate, this);
    }

    public activateAggressivePads(): void {
        if (this._levelPattern) {
            this._levelPattern.forEach((levelPads) => {
                const pad = this.getPads(levelPads);
                pad.reset();
                pad.state = PadState.blocked;
            });
            this._levelPattern.length = 0;
        }

        console.warn(levels[this._level - 1]);
        levels[this._level - 1].forEach((levelPads) => {
            this.getPads(`pad_${levelPads.row}_${levelPads.col}`).state = PadState.active;
        });
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
        this._checkIsTruePad(padUUid, this._clickCount);
        this._clickCount += 1;
    };

    public showHintDuringGame = (): void => {
        this._padsCount = 0;
        this._showHint();
    };

    public showAggressiveCtaHint = (): void => {
        const firstLevelSequence: string[] = [];
        const secondLevelSequence: string[] = [];
        let time1 = 0;
        let time2 = 0;
        let count1 = 0;
        let count2 = 0;

        levels[0].forEach((levelPads) => {
            firstLevelSequence.push(`pad_${levelPads.row}_${levelPads.col}`);
        });
        firstLevelSequence.push(`pad_${2}_${3}`, `pad_${1}_${3}`);

        levels[1].forEach((levelPads) => {
            secondLevelSequence.push(`pad_${levelPads.row}_${levelPads.col}`);
        });

        const loop1 = loopRunnable(
            0.08 * levelLength,
            () => {
                time1 += Math.round(4 * 0.08 * 100) / 100;
                time1 = Math.round(time1 * 100) / 100;
                if (Math.round(time1 * 100) % ((levelLength * 100) / firstLevelSequence.length) == 0) {
                    this.getPads(firstLevelSequence[count1 - 1])
                        ? (this.getPads(firstLevelSequence[count1 - 1]).state = PadState.hideHint)
                        : false;
                    this.getPads(firstLevelSequence[count1]).running();

                    this.getPads(firstLevelSequence[count1]).state = PadState.showHint;
                    this.getPads(firstLevelSequence[count1]).state = PadState.animate;
                    count1 += 1;
                }

                if (time1 >= levelLength) {
                    this.getPads(firstLevelSequence[count1 - 1]).state = PadState.hideHint;
                    removeRunnable(loop1);
                }
            },
            this,
        );

        const loop2 = loopRunnable(
            0.1 * levelLength,
            () => {
                time2 += Math.round(4 * 0.1 * 100) / 100;
                time2 = Math.floor(time2 * 100) / 100;

                if ((time2 * 10) % ((levelLength * 10) / secondLevelSequence.length) == 0) {
                    this.getPads(secondLevelSequence[count2 - 1])
                        ? (this.getPads(secondLevelSequence[count2 - 1]).state = PadState.hideHint)
                        : false;

                    this.getPads(secondLevelSequence[count2]).state = PadState.showHint;
                    this.getPads(secondLevelSequence[count2]).state = PadState.animate;
                    this.getPads(secondLevelSequence[count2]).running();
                    count2 += 1;
                }

                if (time2 >= levelLength) {
                    this.getPads(secondLevelSequence[count2 - 1]).state = PadState.hideHint;
                    removeRunnable(loop2);
                    this._state = BoardState.aggressiveCtaComplete;
                }
            },
            this,
        );

        //
    };

    public getPads(padsUUid: string): PadModel {
        return this._pads.get(padsUUid);
    }
    ///counts the level score
    public checkLevelScore(): void {
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

    private _destroyScore(): void {
        this._score = null;
    }

    private _showHint(): void {
        if (this._timer.pointers[this._padsCount]) {
            if (this._entryTimer >= this._timer.pointers[this._padsCount].position) {
                this._progressEmitter();
            }
        } else if (this._entryTimer > levelLength) {
            this._progress = true;
        } else {
            this.getPads(this._levelPattern[this._padsCount - 1]).state = PadState.hideHint;
        }
    }

    //update progress or remove updating loop
    private _progressEmitter(): void {
        if (this._levelPattern[this._padsCount - 1]) {
            this.getPads(this._levelPattern[this._padsCount - 1]).state = PadState.hideHint;
        }

        this._state === BoardState.imitation ? this.getPads(this._levelPattern[this._padsCount]).running() : false;
        this.getPads(this._levelPattern[this._padsCount]).state = PadState.showHint;
        this._padsCount += 1;
    }

    //check is true input pad
    private _checkIsTruePad(padUUid: string, count: number): void {
        //
        const entryTimer = this._entryTimer;
        const pointers = this._timer.pointers;

        if (pointers[count] && this.getPads(pointers[count].padUUid)) {
            if (padUUid === this.getPads(pointers[count].padUUid).uuid) {
                this._localScore += this._boardPadClickStatusUpdate(
                    pointers[count].position - entryTimer,
                    this.getPads(pointers[count].padUUid),
                );
                return;
            } else {
                this._localScore += this._boardPadClickStatusUpdate(-1, this.getPads(pointers[count].padUUid));
            }
        }
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
        const levelPads = levelOpenPads[this._level - 1];
        this._levelPattern ? (this._levelPattern.length = 0) : (this._levelPattern = []);
        const levelPattern: string[] = [];

        levelPads.forEach((levelPads) => {
            this.getPads(`pad_${levelPads.row}_${levelPads.col}`).state = PadState.active;
        });
        levels[this._level - 1].forEach((levelPads) => {
            levelPattern.push(`pad_${levelPads.row}_${levelPads.col}`);
        });
        this._levelPattern = levelPattern;
        this._levelConstInterval = levelLength / this._levelPattern.length;
    }

    private _boardPadClickStatusUpdate(delta: number, padModel: PadModel): number {
        let winPercentage = 0;
        const maxValueInPercentage = 100 / this._levelPattern.length;
        const value = 1 - Math.abs(delta / this._levelConstInterval);

        if (delta == -1 || value < 0) {
            padModel.showPrompt(BoardPadClickStatus.miss);
            winPercentage = 0;
        } else if (value > 0.01 && value < 0.4) {
            padModel.showPrompt(BoardPadClickStatus.bad);
            winPercentage = maxValueInPercentage - Math.abs(delta / this._levelConstInterval) * maxValueInPercentage;
        } else if (value >= 0.4 && value < 0.7) {
            padModel.showPrompt(BoardPadClickStatus.good);
            winPercentage = maxValueInPercentage - Math.abs(delta / this._levelConstInterval) * maxValueInPercentage;
        } else if (value >= 0.7 && value <= 1) {
            padModel.showPrompt(BoardPadClickStatus.perfect);
            winPercentage = maxValueInPercentage;
        }

        return winPercentage;
    }

    private _onTimerUpdate(): void {
        this._timer.entryTimer += Math.round(4 * timerDelay * 100) / 100;
        this._timer.entryTimer = Math.floor(this._timer.entryTimer * 100) / 100;

        this._entryTimer = this._timer.entryTimer;

        this._showHint();

        if (this._timer.entryTimer >= this._timer.end || this._timer.entryTimer + timerDelay > this._timer.end) {
            removeRunnable(this._timerPRunnable);
            return;
        } else if (
            this._timer.entryTimer % (levelLength / this._levelPattern.length) < 0.3 ||
            (this._timer.entryTimer + timerDelay) % (levelLength / this._levelPattern.length) < timerDelay
        ) {
        }
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
    }
}
