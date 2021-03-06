import { lego } from '@armathai/lego';
import { sound } from '@pixi/sound';
import { utils } from 'pixi.js';
import { PadModelEvent, SoundModelEvent } from '../events/model';
import { PlayableEvent } from '../events/playable';
import { PadViewEvent } from '../events/view';
import { PadStatus } from '../models/pads/pad-model';
import { store } from '../models/store';
import { getPlayable, postRunnable } from '../utils';

export class SoundObservant {
    public constructor() {
        lego.event.once(PlayableEvent.start, this._init, this);
    }

    private _init(): void {
        lego.event
            .on(PadViewEvent.click, this._onPadClick, this)
            .on(PlayableEvent.pause, this._pause, this)
            .on(PlayableEvent.resume, this._resume, this)
            .on(PadModelEvent.statusUpdate, this._onPlayImitationSound, this)
            .on(PlayableEvent.volumeChange, this._volumeChange, this)
            .on(SoundModelEvent.muteUpdate, this._onSoundMuteUpdate, this);
        postRunnable(() => {
            if (getPlayable().interaction) {
                this._playLoop();
            } else {
                lego.event.once(PlayableEvent.firstInteraction, this._playLoop, this);
            }
        });
    }

    private _playSFX(name: string): void {
        this._play(name);
    }

    private _playLoop(): void {
        // this._play('theme');
    }

    private _onSoundMuteUpdate(mute: boolean): void {
        mute ? this._mute() : this._unmute();
    }

    private _unmute(): void {
        sound.unmuteAll();
    }

    private _mute(): void {
        sound.muteAll();
    }

    private _pause(): void {
        (!utils.isMobile.apple.device || sound.useLegacy) && sound.pauseAll();
    }

    private _resume(): void {
        (!utils.isMobile.apple.device || sound.useLegacy) && sound.resumeAll();
    }

    private _volumeChange(volumePercentage: number): void {
        sound.volumeAll = volumePercentage / 100 || 0;
    }

    private _onPadClick(padUUid: string): void {
        const { index } = store.play.board.getPadByUuid(padUUid);

        sound.play(`${index + 1}`);
    }

    private _onPlayImitationSound(newValue: PadStatus, oldValue: PadStatus, uuid: string): void {
        const { index } = store.play.board.getPadByUuid(uuid);

        if (newValue === PadStatus.play) {
            // sound.stopAll();
            sound.play(`${index + 1}`);
        }
    }

    private _play(
        sprite: string,
    ): import('@pixi/sound').IMediaInstance | Promise<import('@pixi/sound').IMediaInstance> {
        return sound.play(sprite);
    }
}
