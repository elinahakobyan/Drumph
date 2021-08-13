import { lego } from '@armathai/lego';
import { PadState } from '../models/pads/pad-model';
import { PlayableState } from '../models/playable-model';
import { store } from '../models/store';
import { delayRunnable } from '../utils';
import { setPlayableStateCommand } from './set-playable-state-command';

export const goToCTACommand = (padId: string): void => {
    console.warn(padId);

    store.play.board.getPadByUuid(padId).state = PadState.animate;

    delayRunnable(1, () => {
        lego.command
            //
            .payload(PlayableState.cta)
            .execute(setPlayableStateCommand);
    });
};
