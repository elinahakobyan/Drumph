import { lego } from '@armathai/lego';
import { tutorialModelGuard } from '../guards/tutorial-model-guard';
import { nextTutorialSequenceCommand } from './next-tutorial-sequence-command';
import { showTutorialSequenceCommand } from './show-tutorial-sequence-command';
import { lastTutorialSequenceGuard } from './tutorial-last-sequence-guard';

export const showRepeatTutorialCommand = (): void => {
    lego.command
        .guard(tutorialModelGuard, lego.not(lastTutorialSequenceGuard))
        .execute(nextTutorialSequenceCommand, showTutorialSequenceCommand);
};
