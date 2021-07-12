import { store } from '../models/store';

export const onTutorialClickCommand = (): void => {
    const { tutorial } = store.playable;
    tutorial.complete = true;
};
