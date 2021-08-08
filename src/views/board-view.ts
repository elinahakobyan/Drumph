import { lego } from '@armathai/lego';
import { DisplayObject } from '@pixi/display';
import { NineSlicePlane } from '@pixi/mesh-extras';
import { Container, Graphics, Rectangle } from 'pixi.js';
import { cellsGap, cellSize } from '../constants/constants';
import { BoardModelEvent, PadModelEvent } from '../events/model';
import { BoardViewEvent } from '../events/view';
import { BoardState, BoardStatus } from '../models/board-model';
import { PadModel, PadState } from '../models/pads/pad-model';
import { delayRunnable } from '../utils';
import { PadView } from './pad/pad-view';

export class BoardView extends Container {
    private _bg: NineSlicePlane;
    private _icon: DisplayObject;
    private _pads: PadView[];
    private _patternPads: PadView[] = [];
    private _padsInteractive = false;
    private _gr: Graphics;

    public constructor() {
        super();

        this._bg = null;
        this.name = 'BoardView';
        lego.event.on(BoardModelEvent.padsUpdate, this._onPadsUpdate, this);
        lego.event.on(BoardModelEvent.stateUpdate, this._onBoardStateUpdate, this);
        lego.event.on(PadModelEvent.stateUpdate, this._onPadStateUpdate, this);
        lego.event.on(BoardModelEvent.statusUpdate, this._onBoardStatusUpdate, this);
        lego.event.on(PadModelEvent.accuracyUpdate, this._onPadAccuracyUpdate, this);

        // lego.event.on(BoardModelEvent.scoreUpdate, this._onBoardScoreUpdate, this);

        this._build();
    }

    public getBounds(): Rectangle {
        const { x, y, width, height } = this._gr.getBounds();

        return new Rectangle(x, y, width, height);
    }

    public onPadsClick(): void {
        this._padsInteractive = true;
        this._patternPads.forEach((pad) => {
            pad.updateClickListener(true);
        });
    }

    public offPadsClick(): void {
        // console.warn('offPadsClick');

        this._padsInteractive = false;
        this._patternPads.forEach((pad) => {
            pad.updateClickListener(false);
        });
    }

    private _onBoardStateUpdate(value: BoardState): void {
        //
        // console.warn('BoardState', value, oldValue);
        switch (value) {
            case BoardState.play:
                this.onPadsClick();
                break;
            case BoardState.idle:
                this.offPadsClick();
                break;
            case BoardState.imitation:
                this.offPadsClick();
                break;
            case BoardState.levelComplete:
                // this.onPadsClick();

                break;

            default:
                break;
        }
    }
    private _onBoardStatusUpdate(value: BoardStatus): void {
        //
        // console.warn('BoardStatus', value, oldValue);
        switch (value) {
            case BoardStatus.start:
                // this.onPadsClick();
                break;
            case BoardStatus.finish:
                // this.offPadsClick();
                break;

            default:
                break;
        }
    }

    private _onPadAccuracyUpdate(newValue: string, oldValue: string, uuid: string): void {
        this._getPad(uuid).showPrompt(newValue);
    }

    private _build(): void {
        const gr = new Graphics();
        gr.beginFill(0x00ff00, 0);
        gr.drawRect(0, 0, 4 * cellSize.width + 3 * cellsGap, 3 * cellSize.height + 2 * cellsGap);
        this.addChild((this._gr = gr));
    }

    private _onPadsUpdate(padsConfig: Map<string, PadModel>): void {
        this._pads = [];
        const { width, height } = cellSize;

        padsConfig.forEach((padConfig) => {
            const { row, col } = padConfig.config;
            const pad = new PadView(padConfig);
            pad.position.set(col * (width + cellsGap) + width / 2, row * (height + cellsGap) + height / 2);
            this._pads.push(pad);
            // pad.block();
            this.addChild(pad);
        });

        this.emit('createPads');
        // console.warn(this._pads);

        lego.event.emit(BoardViewEvent.addPads);
        ///
    }

    private _onLevelPadsUpdate(levelPattern: string[]): void {
        levelPattern.forEach((patternPad) => {
            const pad = <PadView>this._getPad(patternPad);
            pad ? pad.deactivate() : false;
        });
        ///
    }

    // private _onBoardScoreUpdate(score: number, oldScore: number): void {
    //     if (score === null) {
    //         console.warn('new level');
    //         return;
    //     }
    //     console.warn(score, 'score', oldScore);

    //     ///
    // }

    private _onUpdateBoard(progressConfig: ProgressConfig): void {
        if (progressConfig.state === BoardState.play) {
            this.onPadsClick();
        } else {
            const pads: string[] = progressConfig.pads;

            this._onUpdateImitation(pads);
        }
    }

    private _onUpdateImitation(pads: string[]): void {
        pads.forEach((padId) => {
            const pad = this._getPad(padId);
            pad.showHint();
            // pad.activate();
            delayRunnable(
                0.5,
                () => {
                    pad.hideHint();
                    // pad.deactivate();
                },
                this,
            );
        });
        ///
    }

    private _onCompleteUpdateImitation(isComplete: boolean): void {
        // console.warn(isComplete);
        if (isComplete) {
            this.onPadsClick();
        } else {
            this.offPadsClick();
        }

        ///
    }

    private _getPad(name: string): PadView {
        const cell = this._pads.find((pad) => pad.uuid === name);
        // console.warn(cell);

        return cell ? cell : null;
        ///
    }

    private _onPadStateUpdate(newState: string, oldState: string, uuid: string): void {
        // console.warn(uuid);
        // console.warn(newState);

        switch (newState) {
            case PadState.blocked:
                this._getPad(uuid).block();

                break;
            case PadState.active:
                this._getPad(uuid).activate();
                this._patternPads.push(this._getPad(uuid));
                break;
            case PadState.deactivate:
                this._getPad(uuid).block();

                break;
            case PadState.showHint:
                this._getPad(uuid).showHint();

                break;
            case PadState.hideHint:
                this._getPad(uuid).hideHint();

                break;
            case PadState.animate:
                this._getPad(uuid).showAnimation();

                break;

            default:
                break;
        }
    }
}
