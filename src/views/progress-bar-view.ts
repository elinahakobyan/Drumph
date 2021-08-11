import { lego } from '@armathai/lego';
import { Container, Graphics, NineSlicePlane } from 'pixi.js';
import { getProgressBarFillPatchConfig } from '../constants/configs/nineslice-configs';
import { ProgressBarModelEvent } from '../events/model';
import { makeNineSlice } from '../utils';

export class ProgressBarView extends Container {
    private _fill: NineSlicePlane;
    private _maxWidth: number;

    public constructor() {
        super();
        this._maxWidth = 1400;
        this._build();
        lego.event.on(ProgressBarModelEvent.progressUpdate, this._updateProgress, this);

        const gr = new Graphics();
        gr.beginFill(0x00ff00, 0);
        gr.drawRect(0, 0, this._maxWidth, 5);
        this.addChild(gr);
    }

    private _updateProgress(progress: number): void {
        this._fill.width = this._maxWidth * progress;
    }

    private _build(): void {
        this._buildFill();
    }

    private _buildFill(): void {
        const fill = makeNineSlice(getProgressBarFillPatchConfig());
        fill.width = this._maxWidth * 0;
        this.addChild((this._fill = fill));
    }
}
