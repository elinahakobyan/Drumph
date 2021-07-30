import { lego } from '@armathai/lego';
import { tutorialModelGuard } from '../guards/tutorial-model-guard';
import { isFirstOrThirdTutorialSequence } from './is-first-or-third-tutorial-sequence';
import { setFreeModeStateOnBoardCommand } from './set-free-mode-state-on-board-command';
import { setTutorialCompleteCommand } from './set-tutorial-complete-command';
import { lastTutorialSequenceGuard } from './tutorial-last-sequence-guard';

export const onTutorialHideCompleteCommand = (): void => {
    lego.command
        //
        .guard(tutorialModelGuard, lastTutorialSequenceGuard)
        .execute(setTutorialCompleteCommand)

        .guard(isFirstOrThirdTutorialSequence)
        .execute(setFreeModeStateOnBoardCommand);
};
