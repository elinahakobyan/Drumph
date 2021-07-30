import { store } from '../models/store';

export const boardProgressGuard = (): boolean => {
    return store.play.board.progress !== null;
};
