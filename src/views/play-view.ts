import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import gsap from 'gsap/gsap-core';
import { NineSlicePlane } from 'pixi.js';
import { getPlayGridConfig } from '../constants/configs/grid-configs';
import { BoardModelEvent, PlayModelEvent } from '../events/model';
import { PlayViewEvent } from '../events/view';
import { BoardModel, BoardState } from '../models/board-model';
import { lp } from '../utils';
import { BoardView } from './board-view';
import { ScoreComponent } from './score-component';

export class PlayView extends PixiGrid {
    private _board: BoardView;
    private _score: NineSlicePlane;

    public constructor() {
        super();
        this.name = 'PlayView';
        lego.event.on(PlayModelEvent.boardUpdate, this._onBoardUpdate, this);
        lego.event.on(BoardModelEvent.stateUpdate, this._onBoardStateUpdate, this);
        lego.event.on(BoardModelEvent.scoreUpdate, this._onBoardScoreUpdate, this);
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
            case BoardState.levelComplete:
                this._buildScoreComponent();
                break;
            default:
                break;
        }
    }

    private _buildBoard(): void {
        this._board = new BoardView();
        this._board.rotation = lp(0, Math.PI * 0.5);
        this._board.on('createPads', () => {
            this.setChild('board', this._board);
        });
    }

    private _destroyBoard(): void {
        this._board.destroy();
    }

    // score-component

    private _buildScoreComponent(): void {
        const score = new ScoreComponent();
        score.on('scoreBtnClick', () => {
            lego.event.emit(PlayViewEvent.onScoreBtnClick);
            this._hideScore();
        });
        this.setChild('score', (this._score = score));
        this._showScore();
    }

    private _showScore(): void {
        const posY = this._score.position.y;
        this._score.position.y = 800;
        gsap.to(this._score.position, {
            y: posY,
            duration: 0.8,
        });
    }

    private _hideScore(): void {
        gsap.to(this._score.position, {
            y: -800,
            duration: 0.8,
        }).eventCallback('onComplete', this._destroyScoreComponent.bind(this));
    }

    private _onBoardScoreUpdate(newValue: number): void {
        // console.warn(newValue);
    }

    private _destroyScoreComponent(): void {
        this._score.destroy();
        this._score = null;
    }
}
