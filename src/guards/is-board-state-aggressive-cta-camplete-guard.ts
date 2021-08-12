import { BoardState } from '../models/board-model';
import { store } from '../models/store';

export const isBoardStateAggressiveCtaCompleteGuard = (): boolean => {
    return store.play.board.state === BoardState.aggressiveCtaComplete;
};
