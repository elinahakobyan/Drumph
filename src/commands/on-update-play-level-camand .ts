import { store } from '../models/store';

export const onUpadatePlayLevelCommand = (): void => {
    store.play.board.startPlayLevel();
};
