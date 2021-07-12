import { store } from '../models/store';

export const initializePersistentCtaModelCommand = (): void => {
    store.playable.initializePersistentCtaModel();
};
