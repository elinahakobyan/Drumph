import { lego } from '@armathai/lego';
import { Texture } from '@pixi/core';
import { Rectangle } from '@pixi/math';
import { Sprite } from '@pixi/sprite';
import { gsap } from 'gsap';
import { getSoundOffTextureConfig, getSoundOnTextureConfig } from '../constants/configs/texture-configs';
import { SoundModelEvent } from '../events/model';
import { SoundToggleComponentEvent } from '../events/view';
import { store } from '../models/store';
import { getParams, makeTexture } from '../utils';

enum ToggleState {
    off,
    on,
}

export class SoundToggleComponent extends Sprite {
    private _textureOff: Texture;
    private _textureOn: Texture;
    private _state: ToggleState = ToggleState.on;

    public constructor() {
        super(makeTexture(getSoundOnTextureConfig(getParams().sound_icon_design.value)));

        this.anchor.set(0.5);
        this._textureOn = this.texture;
        this._textureOff = makeTexture(getSoundOffTextureConfig(getParams().sound_icon_design.value));
        this.interactive = true;
        this.buttonMode = true;
        this.hitArea = this._getHitArea();
        this.on('pointerup', this._onPointerup, this);
        this._updateTexture();
        lego.event.on(SoundModelEvent.muteUpdate, this._onSoundMuteUpdate, this);
        this._onSoundMuteUpdate(store.playable.sound.mute);
    }

    private _getHitTween(): gsap.core.Tween {
        return gsap.to(this.scale, {
            x: this.scale.x - 0.1,
            y: this.scale.x - 0.1,
            duration: 0.1,
            repeat: 1,
            yoyo: true,
            paused: true,
            onStart: () => {
                this.interactive = false;
            },
            onComplete: () => {
                this.interactive = true;
            },
        });
    }

    private _getHitArea(): Rectangle {
        const { width: onW, height: onH } = this._textureOn.frame;
        const { width: offW, height: offH } = this._textureOff.frame;
        const hitAreaW = Math.max(onW, offW);
        const hitAreaH = Math.max(onH, offH);
        return new Rectangle(-hitAreaW / 2, -hitAreaH / 2, hitAreaW, hitAreaH);
    }

    private _onPointerup(): void {
        this._getHitTween().play();
        lego.event.emit(SoundToggleComponentEvent.click);
    }

    private _updateTexture(): void {
        switch (this._state) {
            case ToggleState.on:
                this.texture = this._textureOn;
                break;
            case ToggleState.off:
                this.texture = this._textureOff;
                break;
            default:
                throw new Error(`Unknown state: ${this._state}`);
        }
    }

    private _onSoundMuteUpdate(mute: boolean): void {
        if (mute) {
            this._state = ToggleState.off;
        } else {
            this._state = ToggleState.on;
        }
        this._updateTexture();
    }
}
