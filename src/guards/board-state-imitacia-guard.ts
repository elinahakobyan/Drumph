import { BoardState } from '../models/board-model';
import { store } from '../models/store';

export const boardStateImitationGuard = (): boolean => {
    return store.play.board.state === BoardState.imitation;
};
