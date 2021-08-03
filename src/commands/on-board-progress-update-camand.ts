import { BoardState, BoardStatus } from '../models/board-model';
import { store } from '../models/store';

export const onBoardProgressUpdate = (newValue: number, oldValue: number): void => {
    // console.log(newValue, store.play.board.state);

    if (newValue === null && oldValue === 1) {
        if (store.play.board.state === BoardState.imitation) {
            store.play.board.nextToState();
        } else {
            store.play.board.status = BoardStatus.finish;
        }
    }
    //
};
