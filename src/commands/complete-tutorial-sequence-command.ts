import { store } from '../models/store';

export const completeTutorialSequenceCommand = (): void => {
    store.playable.tutorial.completeSequence();
};
