import { lego } from '@armathai/lego';
import { PlayableState } from '../models/playable-model';
import { delayRunnable } from '../utils';
import { setPlayableStateCommand } from './set-playable-state-command';

export const goToCTACommand = (padId: string): void => {
    console.warn(padId);

    // store.play.board.getPadByUuid(padId).a

    delayRunnable(1, () => {
        lego.command
            //
            .payload(PlayableState.cta)
            .execute(setPlayableStateCommand);
    });
};
