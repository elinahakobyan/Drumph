import { store } from '../models/store';

export const isAggressiveCtaLevelGuard = (): boolean => {
    return store.play.board.level === 3;
};
