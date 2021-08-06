import { BoardModel } from './board-model';
import { ObservableModel } from './observable-model';
import { ProgressBarModel } from './progress-bar-model';

export class PlayModel extends ObservableModel {
    private _board: BoardModel;
    private _progressBar: ProgressBarModel = null;

    public constructor() {
        super('PlayModel');
        this.makeObservable();
    }

    public get board(): BoardModel {
        return this._board;
    }

    public get progressBar(): ProgressBarModel {
        return this._progressBar;
    }

    public initialize(): void {
        this.initializeProgressBarModel();
        this.initializeBoardModel();
    }

    public destroy(): void {
        this._board && this.destroyBoardModel();
        this._progressBar && this.destroyProgressBarModel();
    }

    // BOARD
    public initializeBoardModel(): void {
        this._board = new BoardModel();
        this._board.initialize();
    }

    public destroyBoardModel(): void {
        this._board.destroy();
        this._board = null;
    }

    public initializeProgressBarModel(): void {
        this._progressBar = new ProgressBarModel();
        this._progressBar.initialize();
    }

    public destroyProgressBarModel(): void {
        console.warn('destroyProgressBarModel');

        this._progressBar.destroy();
        this._progressBar = null;
    }
}
