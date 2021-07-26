import { lego } from '@armathai/lego';
import { levelLength, levels, padsConfigs } from '../constants/constants';
import { BoardModelEvent } from '../events/model';
import { ProgressUpdateViewEvent } from '../events/view';
import { loopRunnable, removeRunnable } from '../utils';
import { ObservableModel } from './observable-model';
import { PadModel } from './pads/pad-model';

export enum BoardState {
    unknown = 'unknown',
    play = 'play',
    imitacia = 'imitacia',
    tutorial = 'tutorial',
    passive = 'passive',
    showResult = 'showResult',
}
export const duration = 1.5;
export class BoardModel extends ObservableModel {
    private _state = BoardState.unknown;
    private _visibilityRunnable: Runnable;

    private _pads: Map<string, PadModel> = null;
    private _level: number = null;
    private _progressStepCount: number = null;
    private _progress: number = null;
    private _progressStep: number = null;
    private _levelPattern: string[] = null;
    private _imitacia = false;

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

    public startEmitacia(): void {
        lego.event.emit(ProgressUpdateViewEvent.start, false);

        this._onProgressStepCountUpdate();
        lego.event.emit(ProgressUpdateViewEvent.update, this._levelPattern[0]);

        this._levelPattern.shift();
        console.warn(levelLength / this._progressStepCount);

        this._visibilityRunnable = loopRunnable(levelLength / this._levelPattern.length, this._progressEmitter, this);
    }

    private _progressEmitter(): void {
        if (this._levelPattern.length > 0) {
            this._onProgressUpdate();
            lego.event.emit(ProgressUpdateViewEvent.update, this._levelPattern[0]);
            this._levelPattern.shift();
        } else {
            removeRunnable(this._visibilityRunnable);
            lego.event.emit(ProgressUpdateViewEvent.finish, true);
        }
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
}
