import { store } from '../models/store';

export const showResultCommand = (): void => {
    console.info('-------------', store.play.board.score, '------------');
    //
};
