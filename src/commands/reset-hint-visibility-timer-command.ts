import { store } from '../models/store';

export const resetHintVisibilityTimerCommand = (): void => {
    store.playable.hint.resetVisibilityTimer();
};
