import { store } from '../models/store';

export const onCheckPlayLevelCommand = (padId: string): void => {
    store.play.board.checkPad(padId);
};
