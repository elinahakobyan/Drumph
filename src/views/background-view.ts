import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { Sprite } from '@pixi/sprite';
import { getBackgroundGridConfig } from '../constants/configs/grid-configs';
import { getBgSparkleTextureConfig } from '../constants/configs/texture-configs';
import { Emitter } from '../display/emitter';
import { PlayableModelEvent } from '../events/model';
import { PlayableState } from '../models/playable-model';
import { getParams } from '../utils';

// const bgColors = {
//     Black: '#1f1f1f',
//     'Dark Red': '#8e0000',
//     'Dark Blue': '#1726ca',
//     'Dark Purple': '#4a148c',
//     'Dark Gray': '#263238',
// };
const bgColors = {
    black: '#1f1f1f',
    darkRed: '#8e0000',
    darkBlue: '#1726ca',
    darkPurple: '#4a148c',
    darkGray: '#263238',
};

export class BackgroundView extends PixiGrid {
    private _bg: Sprite;

    public constructor() {
        super();
        this.name = 'BackgroundView';
        this._buildSparkles();
        lego.event.on(PlayableModelEvent.stateUpdate, this._onPlayableStateUpdate, this);
    }

    public getGridConfig(): ICellConfig {
        return getBackgroundGridConfig();
    }

    private _onPlayableStateUpdate(status: PlayableState): void {
        switch (status) {
            case PlayableState.play:
                this._createBg();
                break;

            case PlayableState.cta:
                this._createCTABg();

                break;

            default:
        }
    }

    private _createBg(): void {
        const div = document.getElementById('canvas');
        const canvas = div.getElementsByTagName('canvas')[0];

        switch (getParams().background_color.value) {
            case 'Black':
                canvas.style.backgroundColor = bgColors.black;
                break;
            case 'Dark Red':
                canvas.style.backgroundColor = bgColors.darkRed;
                break;
            case 'Dark Blue':
                canvas.style.backgroundColor = bgColors.darkBlue;
                break;
            case 'Dark Purple':
                canvas.style.backgroundColor = bgColors.darkPurple;
                break;
            case 'Dark Gray':
                canvas.style.backgroundColor = bgColors.darkGray;
                break;

            default:
                break;
        }
    }

    private _createCTABg(): void {
        const div = document.getElementById('canvas');
        const canvas = div.getElementsByTagName('canvas')[0];
        canvas.style.backgroundColor = '#000000';
    }

    private _buildSparkles(): void {
        const emitter = new Emitter({
            x: 300,
            y: 100,
            count: 4,
            key: 'UNCOMPRESSED_ASSETS',
            color: 0xffffff,
            frames: getBgSparkleTextureConfig(),
            particleConfig: {
                scale: 1,
                speed: 0.5,
                duration: 2,
                explodeFactor: 14,
                rotation: Math.PI * 0.5,
            },
        });

        emitter.play();
        this.addChild(emitter);
    }
}
// diameter: number;
//     x: number;
//     y: number;
//     count: number;
//     key: string;
//     color: number;
//     frames: TextureConfig;
//     particleConfig?: {
//         scale?: number;
//         speed?: number;
//         duration?: number;
//         explodeFactor?: number;
