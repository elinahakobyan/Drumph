import { BoardState, BoardStatus } from '../models/board-model';
import { store } from '../models/store';

export const onBoardProgressUpdate = (newValue: number, oldValue: number): void => {
    if (newValue === null && oldValue === 1) {
        store.play.board.state === BoardState.imitation
            ? store.play.board.nextToState()
            : (store.play.board.status = BoardStatus.finish);
    }
    //
};
