import { store } from '../models/store';

export const initializeTutorialModelCommand = (config: TutorialConfig): void => {
    store.playable.initializeTutorialModel(config);
};
