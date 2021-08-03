import { BoardState } from '../models/board-model';
import { store } from '../models/store';

export const boardStateLevelCampleteGuard = (): boolean => {
    return store.play.board.state === BoardState.levelComplete;
};
