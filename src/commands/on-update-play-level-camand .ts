import { store } from '../models/store';

export const onUpdatePlayLevelCommand = (): void => {
    console.warn('llll');

    store.play.board.startImitation();
};
