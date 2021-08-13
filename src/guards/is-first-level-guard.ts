import { store } from '../models/store';

export const isFirstLevelGuard = (): boolean => {
    return store.play.board.level === 1;
};
