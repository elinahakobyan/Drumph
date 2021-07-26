import { lego } from '@armathai/lego';
import { Container, NineSlicePlane } from 'pixi.js';
import { getProgressBarFillPatchConfig } from '../constants/configs/nineslice-configs';
import { BoardModelEvent, ProgressBarModelEvent } from '../events/model';
import { ProgressUpdateViewEvent } from '../events/view';
import { makeNineSlice } from '../utils';

export class ProgressBarView extends Container {
    private _fill: NineSlicePlane;
    private _maxWidth: number;
    public constructor() {
        super();
        lego.event.on(ProgressBarModelEvent.progressUpdate, this._updateProgress, this);
        lego.event.on(ProgressUpdateViewEvent.start, this._buildFill, this);
        lego.event.on(BoardModelEvent.progressStepCountUpdate, this._updateProgressStepCount, this);
        this._build();
    }

    private _updateProgress(progress: number): void {
        this._fill.width = this._maxWidth * progress;
    }

    private _updateProgressStepCount(progress: number): void {
        console.warn(progress);
    }

    private _build(): void {
        const fillBg = makeNineSlice(getProgressBarFillPatchConfig());
        fillBg.tint = 0xff0000;
        this.addChild(fillBg);
    }

    private _buildFill(value: number): void {
        const fill = makeNineSlice(getProgressBarFillPatchConfig());
        this.addChild((this._fill = fill));
        this._fill.scale.x = 0.001;
    }
}
