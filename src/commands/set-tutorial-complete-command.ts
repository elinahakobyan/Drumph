import { store } from '../models/store';

export function setTutorialCompleteCommand(): void {
    store.playable.tutorial.complete = true;
}
