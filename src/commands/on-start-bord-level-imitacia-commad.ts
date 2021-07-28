import { store } from '../models/store';

export const onStartBoardLevelImitationCommand = (): void => {
    store.play.board.startImitation();
    //
};
