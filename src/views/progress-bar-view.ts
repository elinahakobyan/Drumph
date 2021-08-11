import { lego } from '@armathai/lego';
import { Container, NineSlicePlane, Rectangle } from 'pixi.js';
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
    }

    public getBounds(): Rectangle {
        return new Rectangle(0, 0, this._maxWidth * this.parent.parent.scale.x, 10);
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
