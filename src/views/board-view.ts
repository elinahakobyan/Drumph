import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { DisplayObject } from '@pixi/display';
import { NineSlicePlane } from '@pixi/mesh-extras';
import { getBoardGridConfig } from '../constants/configs/grid-configs';
import { BoardModelEvent } from '../events/model';
import { PadModel } from '../models/pads/pad-model';

export class BoardView extends PixiGrid {
    private _bg: NineSlicePlane;
    private _icon: DisplayObject;
    public constructor() {
        super();

        this._bg = null;
        this.name = 'BoardView';
        lego.event.on(BoardModelEvent.padsUpdate, this._onPadsUpdate, this);

        this._build();
    }

    public getGridConfig(): ICellConfig {
        return getBoardGridConfig();
    }

    private _build(): void {
        //
    }

    private _onPadsUpdate(padsConfig: Map<string, PadModel>): void {
        console.warn(padsConfig);

        ///
    }
}
