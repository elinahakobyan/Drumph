import { lego } from '@armathai/lego';
import { CtaModelEvent, PlayableModelEvent } from '../events/model';
import { PlayableEvent } from '../events/playable';
import { BoardViewEvent, CTAViewEvent } from '../events/view';
import { updateLevelCommand } from './creat-level-pattern-commands';
import { createObservancesCommand } from './create-observances-command';
import { initializePlayableModelCommand } from './initialize-playable-model-command';
import { onCtaRevealedCommand } from './on-cta-revealed-command';
import { onCtaRevelationCommand } from './on-cta-revelation-command';
import { onPlayableStartCommand } from './on-playable-start-command';
import { onPlayableStateUpdateCommand } from './on-playable-state-update-command';
import { onResizeCommand } from './on-resize-command';
import { retryCommand } from './retry-command';

export const startupCommand = (): void => {
    if (process.env.NODE_ENV !== 'production') {
        const { addOverlayCommand } = require('./add-overlay-command');
        lego.command.execute(addOverlayCommand);
    }

    lego.command
        .execute(createObservancesCommand)
        .execute(initializePlayableModelCommand)

        .on(PlayableEvent.start, onPlayableStartCommand)
        .on(PlayableEvent.resize, onResizeCommand)
        .on(CtaModelEvent.revealedUpdate, onCtaRevealedCommand)
        .on(CtaModelEvent.revelationUpdate, onCtaRevelationCommand)
        .on(CTAViewEvent.secondaryButtonClick, retryCommand)
        .on(BoardViewEvent.addPads, updateLevelCommand)
        .on(PlayableModelEvent.stateUpdate, onPlayableStateUpdateCommand);
};
