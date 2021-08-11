import { store } from '../models/store';

export const boardProgressIsNullGuard = (): boolean => {
    console.warn(store.play.board.entryTimer, 'guard');

    return store.play.board.entryTimer === 0 ? true : false;
};
