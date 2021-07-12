import { store } from '../models/store';

export const destroySoundModelCommand = (): void => {
    store.playable.destroySoundModel();
};
