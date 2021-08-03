import { lego } from '@armathai/lego';
import { Application } from '@pixi/app';
import { ILoaderResource } from '@pixi/loaders';
import { Rectangle } from '@pixi/math';
import { Ticker } from '@pixi/ticker';
import { Ad, PlayableAdapter } from '@replayable/core';
import { gsap } from 'gsap';
import manifest from '../manifest.json';
import { AssetsLoader } from './assets/loader';
import { PlayableEvent } from './events/playable';
import { lp } from './utils';

export class PlayablePixi extends PlayableAdapter {
    private _assetsLoader: AssetsLoader;
    private _baseBounds: Rectangle;
    private _viewBounds: Rectangle;
    private _viewScale: number;
    private _app: Application;
    private _revealed = false;
    private _interaction = false;
    private _manifest = manifest;

    public constructor(ad: Ad) {
        super(ad);
        this._app = new Application({
            powerPreference: 'low-power',
            resolution: window.devicePixelRatio || 1,
            sharedTicker: true,
            backgroundAlpha: 0,
        });
        this._app.ticker.maxFPS = 60;
        this._assignParams();
    }

    public get app(): Application {
        return this._app;
    }

    public get baseBounds(): Rectangle {
        return this._baseBounds;
    }

    public get viewBounds(): Rectangle {
        return this._viewBounds;
    }

    public get viewScale(): number {
        return this._viewScale;
    }

    public get interaction(): boolean {
        return this._interaction;
    }

    public get params(): typeof manifest.params {
        return this._manifest.params;
    }

    public get size(): typeof manifest.size {
        return this._manifest.size;
    }

    public onReady(): void {
        this._init();
    }

    public onVisibleChange(isVisible: boolean, { width, height }: { width: number; height: number }): void {
        if (!this._revealed) {
            this._reveal(isVisible, { width, height });
            return;
        }
        super.onVisibleChange(isVisible, { width, height });
    }

    public onAudioVolumeChange(volumePercentage: number): void {
        lego.event.emit(PlayableEvent.volumeChange, volumePercentage);
    }

    public onResize({ width, height }: { width: number; height: number }): void {
        console.warn('resize');

        this._resizeCanvas(width, height);
        this._resizeRenderer(width, height);
        this._calculateTransform();

        lego.event.emit(PlayableEvent.resize, width, height);
    }

    public onFirstInteraction(): void {
        this._interaction = true;
        lego.event.emit(PlayableEvent.firstInteraction);
    }

    public onSkip(): void {
        lego.event.emit(PlayableEvent.skip);
    }

    public resume(): void {
        console.warn('resume');
        const ticker = Ticker.shared;
        !ticker.started && ticker.start();
        gsap.ticker.wake();
        lego.event.emit(PlayableEvent.resume);
    }

    public pause(): void {
        console.warn('pause');
        const ticker = Ticker.shared;
        ticker.started && ticker.stop();
        gsap.ticker.sleep();
        lego.event.emit(PlayableEvent.pause);
    }

    private _reveal(isVisible: boolean, { width, height }: { width: number; height: number }): void {
        if (!isVisible) {
            return;
        }
        this._revealed = true;

        this.onResize({ width, height });

        if (this._assetsLoader && !this._assetsLoader.loading) {
            this._start();
        }
    }

    private _init(): void {
        const canvas = document.getElementById('canvas');
        const { view } = this._app;
        view.classList.add('playable');
        canvas.appendChild(view);
        lego.event.emit(PlayableEvent.init);
        this._preload();
    }

    private async _preload(): Promise<void> {
        lego.event.emit(PlayableEvent.preload);
        try {
            this._assetsLoader = new AssetsLoader();
            const resources = await this._assetsLoader.load((progress: number) => this._onAssetsLoadProgress(progress));
            this._onAssetsLoaded(resources);
        } catch (e) {
            throw e;
        }
    }

    private _start(): void {
        this.preloaded();
        lego.event.emit(PlayableEvent.start);
        this._app.view.classList.add('fadeIn');
    }

    private _onAssetsLoadProgress(progress: number): void {
        lego.event.emit(PlayableEvent.loadProgress, progress);
    }

    private _onAssetsLoaded(resources: { [name: string]: ILoaderResource }): void {
        lego.event.emit(PlayableEvent.load, resources);
        if (this._revealed) {
            this._start();
        }
    }

    private _resizeCanvas(width: number, height: number): void {
        const { style } = this._app.renderer.view;

        style.width = `${width}px`;
        style.height = `${height}px`;
    }

    private _resizeRenderer(width: number, height: number): void {
        this._app.renderer.resize(width, height);
    }

    private _calculateTransform(): void {
        this._baseBounds = this._getBaseBounds();
        this._viewScale = this._getViewScale();
        this._viewBounds = this._getViewBounds();
    }

    private _getBaseBounds(): Rectangle {
        const { size } = this._manifest;
        const { width, height } = lp(size.landscape, size.portrait);

        return new Rectangle(0, 0, width, height);
    }

    private _getViewScale(): number {
        const { baseBounds } = this;
        const { width: baseWidth, height: baseHeight } = baseBounds;

        const { renderer } = this._app;
        const { width: rendererWidth, height: rendererHeight } = renderer.screen;

        return Math.min(rendererWidth / baseWidth, rendererHeight / baseHeight);
    }

    private _getViewBounds(): Rectangle {
        const { viewScale, app } = this;
        const { x, y, width, height } = app.renderer.screen;

        return new Rectangle(x, y, width / viewScale, height / viewScale);
    }

    private _assignParams(): void {
        const { params } = this._manifest;
        const urlParams = new URLSearchParams(location.search);
        Object.keys(params).forEach((key: keyof typeof params) => {
            if (urlParams.has(key)) {
                const paramType = typeof params[key].value;
                const urlParamsValue = urlParams.get(key);
                let paramsValue: number | string | boolean;
                switch (paramType) {
                    case 'boolean':
                        paramsValue = urlParamsValue === 'true';
                        break;
                    case 'number':
                        paramsValue = +urlParamsValue;
                        break;
                    case 'string':
                        paramsValue = urlParamsValue;
                        break;
                }
                params[key].value = paramsValue;
            }
        });
    }
}

window.replayable.Playable = PlayablePixi;
