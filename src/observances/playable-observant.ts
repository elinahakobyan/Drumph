/* eslint-disable class-methods-use-this */
import { lego } from '@armathai/lego';
import { CtaModelEvent } from '../events/model';
import { CTAViewEvent, PersistentCTAComponentEvent } from '../events/view';
import { getPlayable } from '../utils';

export class PlayableObservant {
    public constructor() {
        lego.event
            .on(PersistentCTAComponentEvent.click, this._onPersistentCtaClick, this)
            .on(CTAViewEvent.screenClick, this._onCTAScreenClick, this)
            .on(CTAViewEvent.primaryButtonClick, this._onCTAScreenPrimaryButtonClick, this)
            .on(CtaModelEvent.revealedUpdate, this._onCTARevealedUpdate, this);
        // lego.event.on(ModelEvents.LoadModel.ProgressUpdate, this._onLoadProgress, this);
        // lego.event.on(ModelEvents.LoadModel.CompleteUpdate, this._onLoadComplete, this);
        // lego.event.on(ModelEvents.AdModel.ViewStateUpdate, this._onViewStateUpdate, this);
        // lego.event.on(ViewEvents.CtaView.ScreenClick, this._clickGo, this);
        // lego.event.on(ViewEvents.CtaView.PrimaryClick, this._clickGo, this);
        // lego.event.on(ViewEvents.Game.UserInteraction, this._markInteraction, this);
        // lego.event.on(ModelEvents.CtaModel.VisibleUpdate, this._onCtaVisibleUpdate, this);
    }

    private _onPersistentCtaClick(): void {
        this._playableOpen();
    }

    private _onCTAScreenClick(): void {
        this._playableOpen();
    }

    private _onCTAScreenPrimaryButtonClick(): void {
        this._playableOpen();
    }

    private _onCTARevealedUpdate(): void {
        this._playableCta();
    }

    private _playableOpen(): void {
        getPlayable().open();
    }

    private _playableCta(): void {
        getPlayable().cta();
    }
    // _onLoadProgress(progress) {
    //     wrapper_load_progress(progress);
    // }

    // _onLoadComplete() {
    //     wrapper_preload_complete();
    // }

    // _onViewStateUpdate(state) {
    //     switch (state) {
    //         case ViewState.Create:
    //             this._hideSplash();
    //             break;
    //         default:
    //     }
    // }

    // _hideSplash() {
    //     wrapper_hide_splash();
    // }

    // _markInteraction() {
    //     wrapper_mark_interaction();
    // }

    // _onCtaVisibleUpdate(visible) {
    //     if (visible) {
    //         if (store.ad.cta.reason === GameOverReasons.Unknown) {
    //             // eslint-disable-next-line no-console
    //             console.error('Please provide game over reason');
    //         }

    //         wrapper_mark_cta(store.ad.cta.reason);
    //     }
    // }
}
