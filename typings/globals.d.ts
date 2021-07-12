/* eslint-disable @typescript-eslint/triple-slash-reference */
/* eslint-disable @typescript-eslint/naming-convention */
/// <reference path="../node_modules/@replayable/core/typings/globals.d.ts" />

declare const __NETWORK__: string;
declare const __SOUND__: boolean;
declare const __SOUND_ICON__: boolean;
declare const __SPINE__: boolean;
declare const __LEGOLOGGER__: boolean;
declare const __HTML5_AUDIO__: boolean;
declare const __GOOGLE_FONTS__: boolean;
declare const __INSTANT_AD_TIMER_START__: boolean;
declare const __FORCE__GOOGLEPLAY__: boolean;
declare const __FORCE__APPSTORE__: boolean;

interface Navigator {
    browserLanguage: string;
    systemLanguage: string;
    userLanguage: string;
}

type Callback = EventEmitter.ListenerFn;
