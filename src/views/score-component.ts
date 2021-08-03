import { NineSlicePlane, Texture } from 'pixi.js';
import { getScoreNextLevelButtonConfig } from '../constants/configs/button-configs';
import { getScoreNumberConfig, getScorePopUpTextConfig } from '../constants/configs/text-configs';
import { store } from '../models/store';
import { makeText } from '../utils';
import { Button } from '../utils/button';

export class ScoreComponent extends NineSlicePlane {
    private _bg: NineSliceConfig;

    public constructor() {
        super(Texture.from('play/score_bg.png'), 24, 24, 24, 24);
        this.width = 800;
        this.height = 350;
        this.name = 'ForegroundView';
        this._build();
    }

    private _build(): void {
        this._buildBtn();
        this._buildText();
    }

    private _buildText(): void {
        const text = makeText(getScorePopUpTextConfig());
        const scoreNumbers = makeText(getScoreNumberConfig(store.play.board.score));
        // console.warn(store.play.board.score, 'SCORE');
        scoreNumbers.position.set(420, 180);
        text.position.set(420, 100);
        this.addChild(text);
        this.addChild(scoreNumbers);
    }

    private _buildBtn(): void {
        const btn = new Button(getScoreNextLevelButtonConfig());
        btn.position.set(55, 260);
        btn.interactive = true;
        // btn.on('pointerup', () => {
        //     lego.event.emit(PlayViewEvent.onScoreBtnClick);
        // });
        this.addChild(btn);
    }
}
