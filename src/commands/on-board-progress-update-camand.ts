import { BoardState, BoardStatus } from '../models/board-model';
import { store } from '../models/store';

export const onBoardProgressUpdate = (newValue: boolean, oldValue: boolean): void => {
    // store.play.progressBar.progress = newValue;
    console.warn(newValue);

    if (newValue) {
        if (store.play.board.state === BoardState.imitation) {
            store.play.board.entryTimer = 0;
            store.play.board.nextToState();
        } else {
            store.play.board.status = BoardStatus.finish;
        }
    }
    //
};
