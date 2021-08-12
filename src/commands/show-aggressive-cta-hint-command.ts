import { store } from '../models/store';

export const showAggressiveCTAHintCommand = (): void => {
    // console.warn('asfghakujhfgk');
    store.play.board.showAggressiveCtaHint();
};
