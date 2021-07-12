import { store } from '../models/store';

export const persistentCtaModelGuard = (): boolean => {
    return !!store.playable.persistentCta;
};
