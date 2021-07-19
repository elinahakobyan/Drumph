import { lego } from '@armathai/lego';
import { levels, padsConfigs } from '../constants/constants';
import { BoardModelEvent } from '../events/model';
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
export class BoardModel extends ObservableModel {
    private _state = BoardState.unknown;
    private _pads: Map<string, PadModel> = null;
    private _level: number = null;
    private _levelPattern: string[] = null;
    private _imitacia = false;

    public constructor() {
        super('BoardModel');
        lego.event.on(BoardModelEvent.levelUpdate, this._onLevelUpdate, this);
        this.makeObservable();
    }

    public get state(): string {
        return this._state;
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

    public initialize(): void {
        this._state = BoardState.passive;
        this._createPads();
        // this._createlevelPattern(1);
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
}
