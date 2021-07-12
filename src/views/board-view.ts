import { lego } from '@armathai/lego';
import { DisplayObject } from '@pixi/display';
import { NineSlicePlane } from '@pixi/mesh-extras';
import { spines } from '../assets/spines';
import { objectiveCompleteCommand } from '../commands/objective-complete-command';
import { getPowerupSpineConfig } from '../constants/configs/spine-configs';
import { makeNineSlice, makeSpine } from '../utils';
import { Container } from '../utils/container';

export class BoardComponent extends Container {
    private _bg: NineSlicePlane;
    private _icon: DisplayObject;

    public constructor() {
        super();

        this._bg = null;
        this._icon = null;
        this.name = 'BoardComponent';

        this._build();
    }

    public get icon(): DisplayObject {
        return this._icon;
    }

    private _build(): void {
        this._bg = makeNineSlice({
            texture: `ui/cta_box.png`,
            data: [150, 56, 44, 37],
            width: 580,
            height: 580,
        });
        this._bg.pivot.set(this._bg.width * 0.5, this._bg.height * 0.5);
        this._bg.interactive = true;
        this._bg.on('pointerup', () => {
            lego.command.execute(objectiveCompleteCommand);
        });

        this.addChild(this._bg);

        if (__SPINE__) {
            const spine = makeSpine(getPowerupSpineConfig());
            spine.state.setAnimation(0, spines.powerup.animations.bounce, true);
            this._icon = spine;
        } else {
            const plane = makeNineSlice({
                texture: `ui/cta_play_button.png`,
                data: [13, 13, 13, 19],
                width: 280,
                height: 117,
            });

            plane.pivot.set(plane.width * 0.5, plane.height * 0.5);
            this._icon = plane;
        }

        this.addChild(this._icon);
    }
}
