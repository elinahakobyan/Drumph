import { BoardState } from '../models/board-model';
import { store } from '../models/store';

export const boardStateLevelCompleteGuard = (): boolean => {
    return store.play.board.state === BoardState.levelComplete;
};
