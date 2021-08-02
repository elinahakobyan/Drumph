import { store } from '../models/store';

export const onUpdatePlayLevelCommand = (): void => {
    store.play.board.startImitation();
};
