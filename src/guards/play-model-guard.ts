import { store } from '../models/store';

export const playModelGuard = (): boolean => {
    return !!store.play;
};
