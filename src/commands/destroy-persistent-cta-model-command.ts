import { store } from '../models/store';

export const destroyPersistentCtaModelCommand = (): void => {
    store.playable.destroyPersistentCtaModel();
};
