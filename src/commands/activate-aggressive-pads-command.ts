import { store } from '../models/store';

export const activateAggressivePadsCommand = (): void => {
    store.play.board.activateAggressivePads();
};
