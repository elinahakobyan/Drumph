// import { lego } from '@armathai/lego';
// import gsap from 'gsap';
// import { Container, NineSlicePlane } from 'pixi.js';
// import { getProgressBarFillPatchConfig } from '../constants/configs/nineslice-configs';
// import { levelLength } from '../constants/constants';
// import { BoardModelEvent } from '../events/model';
// import { makeNineSlice } from '../utils';

// export class ProgressBarView extends Container {
//     private _passiveLine: NineSlicePlane;
//     private _activeLine: NineSlicePlane;
//     private _anim: gsap.core.Tween = null;
//     private _color: 0xff00ff;
//     public constructor() {
//         super();
//         this._build();
//         // lego.event.on(ProgressUpdateViewEvent.start, this._startAnim, this);
//         lego.event.on(BoardModelEvent.progressUpdate, this._updateProgress, this);
//     }

//     private _updateProgress(progress: number): void {
//         if (this._anim) {
//             return;
//         }
//         this._activeLine.visible = true;
//         this._startAnim();
//     }

//     private _updateProgressStepCount(progress: number): void {
//         // const anim = gsap.to(this.scale, { x: progress, duration: levelLength });
//     }

//     private _createLine(color: number): NineSlicePlane {
//         const line = makeNineSlice(getProgressBarFillPatchConfig());
//         line.width = 1400;
//         line.tint = color;
//         return line;
//     }

//     private _build(): void {
//         this.addChild((this._passiveLine = this._createLine(0xff0000)));
//         this.addChild((this._activeLine = this._createLine(0x00ff00)));
//         this._passiveLine.alpha = 1;
//         this._activeLine.width = 0;
//         // this._activeLine.visible = false;
//     }

//     private _startAnim(): void {
//         // return;

//         this._anim = gsap.to(this._activeLine, {
//             width: this._passiveLine.width,
//             duration: levelLength,
//             ease: 'Power0.easeNone',
//             onComplete: () => {
//                 this._activeLine.visible = false;
//             },
//         });
//     }
// }
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
        return new Rectangle(0, 0, this._maxWidth, 10);
    }

    private _updateProgress(progress: number): void {
        // console.warn('hasa');

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
