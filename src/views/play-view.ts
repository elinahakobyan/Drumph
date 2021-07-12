import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { BoardComponent } from '../components/board-component';
import { getPlayGridConfig } from '../constants/configs/grid-configs';
import { PlayModelEvent } from '../events/model';
import { BoardModel } from '../models/board-model';

export class PlayView extends PixiGrid {
    private _board: BoardComponent;

    public constructor() {
        super();
        this.name = 'PlayView';
        lego.event.on(PlayModelEvent.boardUpdate, this._onBoardUpdate, this);
    }

    public getGridConfig(): ICellConfig {
        return getPlayGridConfig();
    }

    // BOARD
    private _onBoardUpdate(board: BoardModel): void {
        board ? this._buildBoard() : this._destroyBoard();
    }

    private _buildBoard(): void {
        this.setChild('board', (this._board = new BoardComponent()));
    }

    private _destroyBoard(): void {
        this._board.destroy();
    }
}
