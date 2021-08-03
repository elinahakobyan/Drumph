import { store } from '../models/store';

export function nextTutorialSequenceCommand(): void {
    store.playable.tutorial.nextSequence();
}
