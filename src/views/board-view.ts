import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { DisplayObject } from '@pixi/display';
import { NineSlicePlane } from '@pixi/mesh-extras';
import { PadComponent } from '../components/pad-component';
import { getBoardGridConfig } from '../constants/configs/grid-configs';
import { BoardModelEvent } from '../events/model';
import { BoardViewEvent } from '../events/view';
import { PadModel } from '../models/pads/pad-model';

export class BoardView extends PixiGrid {
    private _bg: NineSlicePlane;
    private _icon: DisplayObject;
    private _pads: PadComponent[];
    public constructor() {
        super();

        this._bg = null;
        this.name = 'BoardView';
        lego.event.on(BoardModelEvent.padsUpdate, this._onPadsUpdate, this);
        lego.event.on(BoardModelEvent.levelPatternUpdate, this._onLevelPadsUpdate, this);

        this._build();
    }

    public getGridConfig(): ICellConfig {
        return getBoardGridConfig();
    }

    private _build(): void {
        //
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

    private _getPad(name: string): PadComponent {
        const cell = this._pads.find((pad) => pad.name === name);

        return cell ? cell : null;
        ///
    }
}
