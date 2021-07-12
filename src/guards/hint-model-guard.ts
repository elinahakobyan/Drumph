import { store } from '../models/store';

export const hintModelGuard = (): boolean => {
    return !!store.playable.hint;
};
