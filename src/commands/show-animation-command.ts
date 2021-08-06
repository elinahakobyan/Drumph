import { store } from '../models/store';

export const showAnimationCommand = (pad: string): void => {
    store.play.board.showAnimation(pad);
};
