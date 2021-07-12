import { lego } from '@armathai/lego';
import { PlayableState } from '../models/playable-model';
import { setPlayableStateCommand } from './set-playable-state-command';

export const retryCommand = (): void => {
    lego.command.payload(PlayableState.retry).execute(setPlayableStateCommand);
};
