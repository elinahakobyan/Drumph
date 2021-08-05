import { BoardState, BoardStatus } from '../models/board-model';
import { store } from '../models/store';

export const onBoardProgressUpdate = (newValue: number, oldValue: number): void => {
    // store.play.progressBar.progress = newValue;

    if (newValue === null && oldValue === 1) {
        if (store.play.board.state === BoardState.imitation) {
            // console.warn('CHI_MTEL');

            store.play.board.nextToState();
        } else {
            store.play.board.status = BoardStatus.finish;
        }
    }
    //
};
