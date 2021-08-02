import { BoardState } from '../models/board-model';
import { store } from '../models/store';

export const boardIdleStateGuard = (): boolean => {
    return store.play.board.state === BoardState.idle;
};
