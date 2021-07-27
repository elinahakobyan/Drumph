import { store } from '../models/store';

export const boardprogresGuard = (): boolean => {
    return store.play.board.progress !== null;
};
