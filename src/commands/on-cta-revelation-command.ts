import { lego } from '@armathai/lego';
import { PlayableState } from '../models/playable-model';
import { setPlayableStateCommand } from './set-playable-state-command';

export const onCtaRevelationCommand = (preVisible: boolean): void => {
    lego.command
        .guard(() => preVisible)
        .payload(PlayableState.ctaRevelation)
        .execute(setPlayableStateCommand);
};
