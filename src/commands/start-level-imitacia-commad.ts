import { store } from '../models/store';

export const startLevelImitationCommand = (): void => {
    // console.warn('asfghakujhfgk');

    store.play.board.startImitation();
};
