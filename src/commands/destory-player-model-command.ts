import { store } from '../models/store';

export const destroyPlayerModelCommand = (): void => {
    console.warn('12222');

    store.destroyPlayerModel();
};
