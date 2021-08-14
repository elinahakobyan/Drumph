import { PadState } from '../models/pads/pad-model';
import { store } from '../models/store';
import { delayRunnable, getPlayable } from '../utils';

export const onAggressiveCtaClickCommand = (padId: string): void => {
    console.warn(padId);

    store.play.board.getPadByUuid(padId).state = PadState.animate;

    delayRunnable(1, () => {
        getPlayable().open();
    });
};
