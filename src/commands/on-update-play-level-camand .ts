import { store } from '../models/store';

export const onUpdatePlayLevelCommand = (padUUid: string): void => {
    store.play.board.startImitation();
    store.play.board.onStartPlay(padUUid);
};
