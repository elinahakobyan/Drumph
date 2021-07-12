import { ObservableModel } from './observable-model';

export class BoardModel extends ObservableModel {
    public constructor() {
        super('BoardModel');

        this.makeObservable();
    }
}
