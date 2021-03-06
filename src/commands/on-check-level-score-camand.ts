import { BoardStatus } from '../models/board-model';
import { store } from '../models/store';

export const onCheckLevelScoreCommand = (status: BoardStatus): void => {
    status === BoardStatus.finish ? store.play.board.checkLevelScore() : false;
};
