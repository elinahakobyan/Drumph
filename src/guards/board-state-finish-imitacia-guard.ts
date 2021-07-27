import { BoardState } from '../models/board-model';
import { store } from '../models/store';

export const boardStateImitaciaFinishGuard = (): boolean => {
    return store.play.board.state === BoardState.imitacia && store.play.board.level === 3;
};
