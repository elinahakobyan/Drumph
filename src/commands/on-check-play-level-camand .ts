import { store } from '../models/store';

export const onCheckPlayLevelCommand = (padId: string): void => {
    // console.warn('check');
    store.play.board.checkPad(padId);
};
