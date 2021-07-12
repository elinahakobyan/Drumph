import { store } from '../models/store';

export const soundModelGuard = (): boolean => {
    return !!store.playable.sound;
};
