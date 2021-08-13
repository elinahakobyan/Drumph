import { BoardState } from '../models/board-model';
import { store } from '../models/store';

export const setBoardStateCommand = (value: BoardState): void => {
    console.warn('setBoardStateCommand');

    store.play.board.state = value;
};
