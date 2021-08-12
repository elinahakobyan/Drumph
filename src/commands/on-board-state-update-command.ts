import { lego } from '@armathai/lego';
import { isBoardStateAggressiveCtaCompleteGuard } from '../guards/is-board-state-aggressive-cta-camplete-guard';
import { tutorialModelGuard } from '../guards/tutorial-model-guard';
import { isAggressiveCtaLevelGuard } from './is-aggressive-cta-guard';
import { isIdleStateGuard } from './is-idle-state-guard';
import { isImitationStateGuard } from './is-imitation-state-guard';
import { isPlayStateGuard } from './is-play-state-guard';
import { nextTutorialSequenceCommand } from './next-tutorial-sequence-command';
import { showAggressiveCTAHintCommand } from './show-aggressive-cta-hint-command';
import { showTutorialSequenceCommand } from './show-tutorial-sequence-command';
import { startLevelImitationCommand } from './start-level-imitacia-commad';
import { lastTutorialSequenceGuard } from './tutorial-last-sequence-guard';

export const onBoardStateUpdateCommand = (state: string): void => {
    console.warn(state);

    lego.command

        .guard(isBoardStateAggressiveCtaCompleteGuard, tutorialModelGuard, lego.not(lastTutorialSequenceGuard))

        .execute(nextTutorialSequenceCommand, showTutorialSequenceCommand)

        .guard(
            lego.not(isAggressiveCtaLevelGuard),
            tutorialModelGuard,
            () => isIdleStateGuard() || isPlayStateGuard(),
            lego.not(lastTutorialSequenceGuard),
        )

        .execute(nextTutorialSequenceCommand, showTutorialSequenceCommand)

        .guard(isImitationStateGuard)
        .execute(startLevelImitationCommand)

        .guard(isIdleStateGuard, isAggressiveCtaLevelGuard)
        .execute(showAggressiveCTAHintCommand);
};
