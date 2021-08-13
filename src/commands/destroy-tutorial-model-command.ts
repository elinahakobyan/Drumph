import { store } from '../models/store';

export const destroyTutorialModelCommand = (): void => {
    console.warn('HASA TRY AGAINIC HETO');
    store.playable.destroyTutorialModel();
};
