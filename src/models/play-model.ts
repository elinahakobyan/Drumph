import { BoardModel } from './board-model';
import { ObservableModel } from './observable-model';

export class PlayModel extends ObservableModel {
    private _board: BoardModel;

    public constructor() {
        super('PlayModel');
        this.makeObservable('_board');
    }

    public get board(): BoardModel {
        return this._board;
    }

    public initialize(): void {
        this.initializeBoardModel();
    }

    public destroy(): void {
        this._board && this.destroyBoardModel();
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
}
