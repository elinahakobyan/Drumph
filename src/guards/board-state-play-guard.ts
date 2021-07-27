import { BoardState } from '../models/board-model';
import { store } from '../models/store';

export const boardStatePlayGuard = (): boolean => {
    return store.play.board.state === BoardState.play;
};
