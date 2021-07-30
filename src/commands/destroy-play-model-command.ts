import { store } from '../models/store';

export const destroyPlayModelCommand = (): void => {
    console.warn('111111');

    store.destroyPlayModel();
};
