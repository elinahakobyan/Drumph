import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { NineSlicePlane } from 'pixi.js';
import { getPlayGridConfig } from '../constants/configs/grid-configs';
import { BoardModelEvent, PlayModelEvent } from '../events/model';
import { BoardModel, BoardState } from '../models/board-model';
import { lp } from '../utils';
import { BoardView } from './board-view';
import { ScoreComponent } from './score-component';

export class PlayView extends PixiGrid {
    private _board: BoardView;
    private _popUp: NineSlicePlane;

    public constructor() {
        super();
        this.name = 'PlayView';
        lego.event.on(PlayModelEvent.boardUpdate, this._onBoardUpdate, this);
        lego.event.on(BoardModelEvent.stateUpdate, this._onBoardStateUpdate, this);
    }

    public rebuild(config: ICellConfig): void {
        super.rebuild(config);
        if (this._board) {
            this._board.rotation = lp(0, Math.PI * 0.5);
            this.setChild('board', this._board);
        }
    }

    public getGridConfig(): ICellConfig {
        return getPlayGridConfig();
    }

    // BOARD
    private _onBoardUpdate(board: BoardModel): void {
        board ? this._buildBoard() : false;
    }

    private _onBoardStateUpdate(state: BoardState): void {
        switch (state) {
            case BoardState.levelCamplete:
                this._buildScoreComponent();
                break;
            default:
                break;
        }
    }

    private _buildBoard(): void {
        this._board = new BoardView();
        this._board.on('createPads', () => {
            this.setChild('board', this._board);
        });
        this._board.rotation = lp(0, Math.PI * 0.5);
    }

    private _destroyBoard(): void {
        this._board.destroy();
    }

    // score-component

    private _buildScoreComponent(): void {
        const score = new ScoreComponent();
        this.setChild('popUp', (this._popUp = score));
    }

    private _destroyScoreComponent(): void {
        // this._board.destroy();
    }
}
