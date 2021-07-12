import { lego } from '@armathai/lego';
import { showEndCardGuard } from '../guards/show-end-card-guard';
import { PlayableState } from '../models/playable-model';
import { setPlayableStateCommand } from './set-playable-state-command';

export const onCtaRevealedCommand = (): void => {
    lego.command.guard(showEndCardGuard).payload(PlayableState.cta).execute(setPlayableStateCommand);
};
