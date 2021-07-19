import { lego } from '@armathai/lego';
import { Sprite } from '@pixi/sprite';
import { getHandTextureConfig } from '../constants/configs/texture-configs';
import { HintModelEvent } from '../events/model';
import { makeTexture } from '../utils';

export class HintComponent extends Sprite {
    public constructor() {
        super(makeTexture(getHandTextureConfig()));
        lego.event.on(HintModelEvent.visibleUpdate, this._onHintVisibleUpdate, this);
        this._hide();
    }

    public destroy(): void {
        lego.event.removeListenersOf(this);
        super.destroy();
    }

    private _onHintVisibleUpdate(visible: boolean): void {
        return;
        visible ? this._show() : this._hide();
    }

    private _show(): void {
        //
    }

    private _hide(): void {
        this.visible = false;
    }
}
