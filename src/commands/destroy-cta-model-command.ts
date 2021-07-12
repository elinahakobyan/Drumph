import { store } from '../models/store';

export const destroyCtaModelCommand = (): void => {
    store.playable.destroyCtaModel();
};
