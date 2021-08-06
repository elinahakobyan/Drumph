import { lego } from '@armathai/lego';
import { tutorialModelGuard } from '../guards/tutorial-model-guard';
import { isIdleStateGuard } from './is-idle-state-guard';
import { isImitationStateGuard } from './is-imitation-state-guard';
import { isPlayStateGuard } from './is-play-state-guard';
import { nextTutorialSequenceCommand } from './next-tutorial-sequence-command';
import { startLevelImitationCommand } from './on-start-bord-level-imitacia-commad';
import { showTutorialSequenceCommand } from './show-tutorial-sequence-command';
import { lastTutorialSequenceGuard } from './tutorial-last-sequence-guard';

export const onBoardStateUpdateCommand = (state: string): void => {
    lego.command
        .guard(tutorialModelGuard, () => isIdleStateGuard() || isPlayStateGuard(), lego.not(lastTutorialSequenceGuard))
        .execute(nextTutorialSequenceCommand, showTutorialSequenceCommand)

        .guard(isImitationStateGuard)
        .execute(startLevelImitationCommand);
};
