import { lego } from '@armathai/lego';
import { Sprite } from '@pixi/sprite';
import { gsap } from 'gsap';
import { getHandTextureConfig } from '../constants/configs/texture-configs';
import { HintModelEvent } from '../events/model';
import { getDisplayObjectByProperty, makeTexture } from '../utils';
import { BoardComponent } from './board-component';

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
        visible ? this._show() : this._hide();
    }

    private _show(): void {
        const boardComponent: BoardComponent = getDisplayObjectByProperty('name', 'BoardComponent') as BoardComponent;
        const iconComponent = boardComponent.icon;
        const pos = this.parent.toLocal(iconComponent.position, boardComponent);

        this.position.set(pos.x, pos.y);
        this.scale.set(1);
        this.visible = true;
        gsap.killTweensOf(this.scale);
        gsap.to(this.scale, {
            x: this.scale.x - 0.1,
            y: this.scale.x - 0.1,
            duration: 0.35,
            repeat: -1,
            yoyo: true,
        });
    }

    private _hide(): void {
        this.visible = false;
    }
}
