import { levelLength } from '../constants/constants';
import { store } from '../models/store';

export const onBoardTimerUpdateCommand = (newValue: number): void => {
    store.play.progressBar.progress = Math.min(1, newValue / (levelLength - 0.5));
};
