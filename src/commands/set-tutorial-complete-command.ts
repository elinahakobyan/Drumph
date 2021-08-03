import { store } from '../models/store';

export function setTutorialCompleteCommand(): void {
    // console.warn('setTutorialCompleteCommand');

    store.playable.tutorial.complete = true;
}
