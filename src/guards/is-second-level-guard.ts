import { store } from '../models/store';

export const isSecondLevelGuard = (): boolean => {
    return store.play.board.level === 2;
};
