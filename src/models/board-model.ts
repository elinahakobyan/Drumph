import { ObservableModel } from './observable-model';

export enum BoardState {
    unknown = 'unknown',
    play = 'play',
    tutorial = 'tutorial',
    passive = 'passive',
    showResult = 'showResult',
}
export class BoardModel extends ObservableModel {
    private _state = BoardState.unknown;
    public constructor() {
        super('BoardModel');

        this.makeObservable();
    }
}
