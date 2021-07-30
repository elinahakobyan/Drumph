import { store } from '../models/store';

export function lastTutorialSequenceGuard(): boolean {
    const { currentIndex, sequences } = store.playable.tutorial;
    return currentIndex === sequences.length - 1;
}
