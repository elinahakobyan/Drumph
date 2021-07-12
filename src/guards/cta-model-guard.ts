import { store } from '../models/store';

export const ctaModelGuard = (): boolean => {
    return !!store.playable.cta;
};
