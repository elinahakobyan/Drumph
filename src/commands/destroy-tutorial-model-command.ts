import { store } from '../models/store';

export const destroyTutorialModelCommand = (): void => {
    store.playable.destroyTutorialModel();
};
