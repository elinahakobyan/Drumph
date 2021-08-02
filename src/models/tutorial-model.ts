import { getTutorialConfig } from '../constants/configs/tutorial-config';
import { ObservableModel } from './observable-model';
import { TutorialSequenceModel } from './tutorial-sequence-model';

export class TutorialModel extends ObservableModel {
    private _complete = false;
    private _skip = false;
    private _sequences: TutorialSequenceModel[];
    private _currentIndex: number;

    public constructor() {
        super('TutorialModel');
        this.makeObservable();
    }

    public get complete(): boolean {
        return this._complete;
    }

    public set complete(value: boolean) {
        this._complete = value;
    }
    public get skip(): boolean {
        return this._skip;
    }

    public set skip(value: boolean) {
        this._skip = value;
    }

    public get sequences(): TutorialSequenceModel[] {
        return this._sequences;
    }

    public get current(): TutorialSequenceModel {
        return this._sequences[this._currentIndex];
    }

    public get currentIndex(): number {
        return this._currentIndex;
    }

    public getSequenceByUuid(uuid: string): TutorialSequenceModel {
        return this._sequences.find((sequence) => sequence.uuid === uuid);
    }

    public initialize(): void {
        super.initialize();

        this._initSequences();

        this.nextSequence();
        this.showSequence();
    }

    public destroy(): void {
        super.destroy();
    }

    public nextSequence(): void {
        this.current && this.completeSequence();
        this._currentIndex = this.current ? this._currentIndex + 1 : 0;
    }

    public completeSequence(): void {
        this.current.complete = true;
    }

    public showSequence(): void {
        this.current.show = true;
    }

    private _initSequences(): void {
        this._sequences = getTutorialConfig().map((config, index) => new TutorialSequenceModel(config, index));
    }
}
