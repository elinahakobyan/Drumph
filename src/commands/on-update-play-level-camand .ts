import { store } from '../models/store';

export const onUpadatePlayLevelCommand = (padId: string): void => {
    store.play.board.startPlayLevel(padId);
};
