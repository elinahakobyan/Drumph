import { BoardState } from '../models/board-model';
import { store } from '../models/store';

export const boardBeforeTutorialGuard = (): boolean => {
    return store.play.board.state === BoardState.tutorial;
};
