import { store } from '../models/store';

export const startLevelImitationCommand = (): void => {
    store.play.board.startImitation();
};
