import { BoardState } from '../models/board-model';
import { store } from '../models/store';

export const setFreeModeStateOnBoardCommand = (): void => {
    store.play.board.state = BoardState.imitation;
};
