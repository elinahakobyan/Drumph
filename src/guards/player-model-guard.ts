import { store } from '../models/store';

export const playerModelGuard = (): boolean => {
    return !!store.player;
};
