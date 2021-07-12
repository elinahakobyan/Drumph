import { lego } from '@armathai/lego';
import { hintModelGuard } from '../guards/hint-model-guard';
import { persistentCtaModelGuard } from '../guards/persistent-cta-model-guard';
import { playModelGuard } from '../guards/play-model-guard';
import { tutorialModelGuard } from '../guards/tutorial-model-guard';
import { PlayableState } from '../models/playable-model';
import { destroyHintModelCommand } from './destroy-hint-model-command';
import { destroyPersistentCtaModelCommand } from './destroy-persistent-cta-model-command';
import { destroyPlayModelCommand } from './destroy-play-model-command';
import { destroyTutorialModelCommand } from './destroy-tutorial-model-command';
import { incrementRetriesCountCommand } from './increment-retries-count-command';
import { initializeModelsCommand } from './initialize-models-command';
import { mapPlayCommandsCommand } from './map-play-commands-command';
import { setPlayableStateCommand } from './set-playable-state-command';
import { shutdownModelsCommand } from './shutdown-models-command';
import { unmapPlayCommandsCommand } from './unmap-play-commands-command';

export const onPlayableStateUpdateCommand = (state: PlayableState): void => {
    switch (state) {
        case PlayableState.play:
            lego.command.execute(mapPlayCommandsCommand, initializeModelsCommand);
            break;

        case PlayableState.ctaRevelation:
            lego.command
                .execute(unmapPlayCommandsCommand)

                .guard(tutorialModelGuard)
                .execute(destroyTutorialModelCommand)

                .guard(hintModelGuard)
                .execute(destroyHintModelCommand);
            break;

        case PlayableState.cta:
            lego.command
                .guard(playModelGuard)
                .execute(destroyPlayModelCommand)

                .guard(persistentCtaModelGuard)
                .execute(destroyPersistentCtaModelCommand);

            break;

        case PlayableState.retry:
            lego.command
                .execute(incrementRetriesCountCommand)

                .execute(shutdownModelsCommand)

                .payload(PlayableState.unknown)
                .execute(setPlayableStateCommand)

                .payload(PlayableState.play)
                .execute(setPlayableStateCommand);

            break;
        default:
    }
};
