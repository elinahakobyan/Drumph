import { store } from '../models/store';

export const tutorialModelGuard = (): boolean => {
    return !!store.playable.tutorial;
};
