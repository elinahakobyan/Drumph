import { lego } from '@armathai/lego';
import { hintGuard } from '../guards/hint-guard';
import { persistentCtaGuard } from '../guards/persistent-cta-guard';
import { soundGuard } from '../guards/sound-guard';
import { tutorialGuard } from '../guards/tutorial-guard';
import { initializeCtaModelCommand } from './initialize-cta-model-command';
import { initializeHintModelCommand } from './initialize-hint-model-command';
import { initializePersistentCtaModelCommand } from './initialize-persistent-cta-model-command';
import { initializePlayModelCommand } from './initialize-play-model-command';
import { initializePlayerModelCommand } from './initialize-player-model-command';
import { initializeSoundModelCommand } from './initialize-sound-model-command';
import { initializeTutorialModelCommand } from './initialize-tutorial-model-command';

export const initializeModelsCommand = (): void => {
    lego.command

        .execute(initializePlayerModelCommand)
        .execute(initializePlayModelCommand)
        .execute(initializeCtaModelCommand)

        .guard(hintGuard)
        .execute(initializeHintModelCommand)

        .guard(tutorialGuard)
        .execute(initializeTutorialModelCommand)

        .guard(persistentCtaGuard)
        .execute(initializePersistentCtaModelCommand)

        .guard(soundGuard)
        .execute(initializeSoundModelCommand);
};
