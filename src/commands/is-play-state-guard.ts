import { BoardState } from '../models/board-model';
import { store } from '../models/store';

export const isPlayStateGuard = (): boolean => {
    return store.play.board.state === BoardState.play ? true : false;
};
