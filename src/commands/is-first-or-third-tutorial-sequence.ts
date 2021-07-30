import { store } from '../models/store';

export const isFirstOrThirdTutorialSequence = (): boolean => {
    console.warn(store.playable.tutorial, 'tutorial');
    const { currentIndex } = store.playable.tutorial;

    return currentIndex === 0 || currentIndex === 2 ? true : false;
};
