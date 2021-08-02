import { BoardStatus } from '../models/board-model';
import { store } from '../models/store';

export const updateBoardStatusCommand = (value: BoardStatus): void => {
    value === BoardStatus.finish ? store.play.board : false;
    //
};
