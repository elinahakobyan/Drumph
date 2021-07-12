import { lego } from '@armathai/lego';
import { ctaModelGuard } from '../guards/cta-model-guard';
import { hintModelGuard } from '../guards/hint-model-guard';
import { persistentCtaModelGuard } from '../guards/persistent-cta-model-guard';
import { playModelGuard } from '../guards/play-model-guard';
import { playerModelGuard } from '../guards/player-model-guard';
import { soundModelGuard } from '../guards/sound-model-guard';
import { tutorialModelGuard } from '../guards/tutorial-model-guard';
import { destroyPlayerModelCommand } from './destory-player-model-command';
import { destroyCtaModelCommand } from './destroy-cta-model-command';
import { destroyHintModelCommand } from './destroy-hint-model-command';
import { destroyPersistentCtaModelCommand } from './destroy-persistent-cta-model-command';
import { destroyPlayModelCommand } from './destroy-play-model-command';
import { destroySoundModelCommand } from './destroy-sound-model-command';
import { destroyTutorialModelCommand } from './destroy-tutorial-model-command';

export const shutdownModelsCommand = (): void => {
    lego.command
        .guard(playerModelGuard)
        .execute(destroyPlayerModelCommand)

        .guard(playModelGuard)
        .execute(destroyPlayModelCommand)

        .guard(ctaModelGuard)
        .execute(destroyCtaModelCommand)

        .guard(soundModelGuard)
        .execute(destroySoundModelCommand)

        .guard(hintModelGuard)
        .execute(destroyHintModelCommand)

        .guard(tutorialModelGuard)
        .execute(destroyTutorialModelCommand)

        .guard(persistentCtaModelGuard)
        .execute(destroyPersistentCtaModelCommand);
};
