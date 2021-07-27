import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { DisplayObject } from '@pixi/display';
import { NineSlicePlane } from '@pixi/mesh-extras';
import { getBoardGridConfig } from '../constants/configs/grid-configs';
import { BoardModelEvent } from '../events/model';
import { BoardViewEvent, ProgressUpdateViewEvent } from '../events/view';
import { BoardState } from '../models/board-model';
import { PadModel } from '../models/pads/pad-model';
import { delayRunnable } from '../utils';
import { PadComponent } from './pad/pad-view';

export class BoardView extends PixiGrid {
    private _bg: NineSlicePlane;
    private _icon: DisplayObject;
    private _pads: PadComponent[];
    private _padsInteractive = false;
    public constructor() {
        super();

        this._bg = null;
        this.name = 'BoardView';
        lego.event.on(BoardModelEvent.padsUpdate, this._onPadsUpdate, this);
        lego.event.on(BoardModelEvent.stateUpdate, this._onStateUpdate, this);
        lego.event.on(BoardModelEvent.levelPatternUpdate, this._onLevelPadsUpdate, this);
        lego.event.on(ProgressUpdateViewEvent.update, this._onUpdateBoard, this);
        lego.event.on(ProgressUpdateViewEvent.finish, this._onCampletUpdateImitacia, this);
        lego.event.on(ProgressUpdateViewEvent.start, this._onCampletUpdateImitacia, this);
        this._build();
    }

    public getGridConfig(): ICellConfig {
        return getBoardGridConfig();
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
        padsConfig.forEach((padConfig) => {
            const pad = new PadComponent(padConfig);
            this._pads.push(pad);
            this.setChild(pad.name, pad);
        });
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

    private _onUpdateBoard(progresConfig: ProgresConfig): void {
        if (progresConfig.state === BoardState.play) {
            this.onPadsClick();
        } else {
            const pads: string[] = progresConfig.pads;

            this._onUpdateImitacia(pads);
        }
    }

    private _onUpdateImitacia(pads: string[]): void {
        console.warn(pads);
        pads.forEach((padId) => {
            const pad = this._getPad(padId);
            pad.activate();
            delayRunnable(
                0.5,
                () => {
                    pad.deactivate();
                },
                this,
            );
        });
        ///
    }

    private _onCampletUpdateImitacia(isCamplet: boolean): void {
        console.warn(isCamplet);
        if (isCamplet) {
            this.onPadsClick();
        } else {
            this.offPadsClick();
        }

        ///
    }

    private _getPad(name: string): PadComponent {
        const cell = this._pads.find((pad) => pad.name === name);

        return cell ? cell : null;
        ///
    }
}
