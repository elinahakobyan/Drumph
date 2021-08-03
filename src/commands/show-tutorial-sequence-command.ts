import { store } from '../models/store';

export function showTutorialSequenceCommand(): void {
    store.playable.tutorial.showSequence();
}
