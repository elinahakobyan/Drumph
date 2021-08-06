import { ObservableModel } from './observable-model';
import { PlayModel } from './play-model';
import { PlayableModel } from './playable-model';
import { PlayerModel } from './player-model';

class Store extends ObservableModel {
    private _playable: PlayableModel = null;
    private _player: PlayerModel = null;
    private _play: PlayModel = null;

    public constructor() {
        super('Store');
        this.makeObservable();
    }

    public get playable(): PlayableModel {
        return this._playable;
    }

    public set playable(value) {
        this._playable = value;
    }

    public get player(): PlayerModel {
        return this._player;
    }

    public set player(value) {
        this._player = value;
    }

    public get play(): PlayModel {
        return this._play;
    }

    public set play(value) {
        this._play = value;
    }

    // PLAYABLE
    public initializeADModel(): void {
        this._playable = new PlayableModel();
        this._playable.initialize();
    }

    // PLAYER
    public initializePlayerModel(): void {
        this._player = new PlayerModel();
        this._player.initialize();
    }

    public destroyPlayerModel(): void {
        this._player.destroy();
        this._player = null;
    }

    // PLAY
    public initializePlayModel(): void {
        this._play = new PlayModel();
        this._play.initialize();
    }

    public destroyPlayModel(): void {
        console.warn('destroyPlayModel');

        this._play.destroy();
        this._play = null;
    }
}

export const store = new Store();
