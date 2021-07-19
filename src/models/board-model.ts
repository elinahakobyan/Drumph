import { levels, padsConfigs } from '../constants/constants';
import { ObservableModel } from './observable-model';
import { PadModel } from './pads/pad-model';

export enum BoardState {
    unknown = 'unknown',
    play = 'play',
    tutorial = 'tutorial',
    passive = 'passive',
    showResult = 'showResult',
}
export class BoardModel extends ObservableModel {
    private _state = BoardState.unknown;
    private _pads: Map<string, PadModel> = null;
    private _level: number = null;
    private _levelPattern: string[] = null;

    public constructor() {
        super('BoardModel');

        this.makeObservable();
    }

    public get state(): string {
        return this._state;
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
            pads.set(padConfig.name, padModel);
        });
        this._pads = pads;
    }

    private _createlevelPattern(level: number): void {
        this._level = level;
        const levelPads = levels[level - 1];
        this._levelPattern ? (this._levelPattern.length = 0) : (this._levelPattern = []);
        levelPads.forEach((levelPads) => {
            this._levelPattern.push(`pad_${levelPads.row}_${levelPads.col}`);
        });
        console.warn(this._levelPattern);
    }
}
