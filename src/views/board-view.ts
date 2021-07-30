import { lego } from '@armathai/lego';
import { DisplayObject } from '@pixi/display';
import { NineSlicePlane } from '@pixi/mesh-extras';
import { Container, Rectangle } from 'pixi.js';
import { cellsGap, cellSize } from '../constants/constants';
import { BoardModelEvent, PadModelEvent } from '../events/model';
import { BoardViewEvent, ProgressUpdateViewEvent } from '../events/view';
import { BoardState } from '../models/board-model';
import { PadModel, PadState } from '../models/pads/pad-model';
import { delayRunnable } from '../utils';
import { PadComponent } from './pad/pad-view';

export class BoardView extends Container {
    private _bg: NineSlicePlane;
    private _icon: DisplayObject;
    private _pads: PadComponent[];
    private _padsInteractive = false;

    public constructor() {
        super();

        this._bg = null;
        this.name = 'BoardView';
        lego.event.on(BoardModelEvent.padsUpdate, this._onPadsUpdate, this);
        // lego.event.on(BoardModelEvent.stateUpdate, this._onStateUpdate, this);
        lego.event.on(PadModelEvent.stateUpdate, this._onPadStateUpdate, this);

        lego.event.on(BoardModelEvent.levelPatternUpdate, this._onLevelPadsUpdate, this);
        lego.event.on(ProgressUpdateViewEvent.update, this._onUpdateBoard, this);
        lego.event.on(ProgressUpdateViewEvent.finish, this._onCompleteUpdateImitation, this);
        lego.event.on(ProgressUpdateViewEvent.start, this._onCompleteUpdateImitation, this);
        this._build();
    }

    public getBounds(): Rectangle {
        // const gr = new Graphics();
        // gr.beginFill(0x00ff00, 0.5);
        // gr.drawRect(-105, -105, 4 * 210 + 3 * cellsGap, 3 * 210 + 2 * cellsGap);
        // this.addChild(gr);

        return new Rectangle(
            -cellSize.width * 0.5,
            -cellSize.height * 0.5,
            4 * cellSize.width + 3 * cellsGap,
            3 * cellSize.height + 2 * cellsGap,
        );
    }

    public onPadsClick(): void {
        this._padsInteractive = true;
        this._pads.forEach((pad) => {
            pad.updateClickListener(true);
        });
    }

    public offPadsClick(): void {
        this._padsInteractive = true;
        this._pads.forEach((pad) => {
            pad.updateClickListener(false);
        });
    }

    private _build(): void {
        //
    }

    private _onStateUpdate(value: BoardState): void {
        //
        console.warn(value);
    }

    private _onPadsUpdate(padsConfig: Map<string, PadModel>): void {
        this._pads = [];
        const { width, height } = cellSize;

        padsConfig.forEach((padConfig) => {
            const { row, col } = padConfig.config;
            const pad = new PadComponent(padConfig);
            pad.position.set(col * (width + cellsGap), row * (height + cellsGap));
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
            const pad = <PadComponent>this._getPad(patternPad);
            pad ? pad.deactivate() : false;
        });
        ///
    }

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
        console.warn(isComplete);
        if (isComplete) {
            this.onPadsClick();
        } else {
            this.offPadsClick();
        }

        ///
    }

    private _getPad(name: string): PadComponent {
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
                this._getPad(uuid).deactivate();

                break;
            case PadState.active:
                this._getPad(uuid).activate();

                break;
            case PadState.deactivate:
                this._getPad(uuid).block();

                break;
            case PadState.showHint:
                this._getPad(uuid).showHint();

                break;
            case PadState.hideShow:
                this._getPad(uuid).hideHint();

                break;

            default:
                break;
        }
    }
}
