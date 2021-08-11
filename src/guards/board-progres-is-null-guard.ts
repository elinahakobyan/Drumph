import { store } from '../models/store';

export const boardProgressIsNullGuard = (): boolean => {
    return store.play.board.entryTimer === 0 ? true : false;
};
