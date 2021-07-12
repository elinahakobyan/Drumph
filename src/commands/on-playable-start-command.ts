import { lego } from '@armathai/lego';
import { PlayableEvent } from '../events/playable';
import { SoundToggleComponentEvent } from '../events/view';
import { PlayableState } from '../models/playable-model';
import { createMainViewCommand } from './create-main-view-command';
import { onPlayableSkipCommand } from './on-playable-skip-command';
import { onSoundToggleComponentClickCommand } from './on-sound-toggle-component-click-command';
import { setPlayableStateCommand } from './set-playable-state-command';

export const onPlayableStartCommand = (): void => {
    lego.command
        .execute(createMainViewCommand)

        .on(PlayableEvent.skip, onPlayableSkipCommand)
        .on(SoundToggleComponentEvent.click, onSoundToggleComponentClickCommand)

        .payload(PlayableState.play)
        .execute(setPlayableStateCommand);
};
