import { BoardState } from '../models/board-model';
import { store } from '../models/store';

export const isImitationStateGuard = (): boolean => {
    return store.play.board.state === BoardState.imitation;
};
