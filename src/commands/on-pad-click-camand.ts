import { lego } from '@armathai/lego';
import { boardProgressIsNullGuard } from '../guards/board-progres-is-null-guard';
import { boardStatePlayGuard } from '../guards/board-state-play-guard';
import { isBoardStateAggressiveCtaCompleteGuard } from '../guards/is-board-state-aggressive-cta-camplete-guard';
import { isBoardStateLevelCompleteGuard } from '../guards/is-board-state-level-camplete-guard';
import { tutorialGuard } from '../guards/tutorial-guard';
import { store } from '../models/store';
import { completeTutorialSequenceCommand } from './complete-tutorial-sequence-command';
import { goToCTACommand } from './go-to-cta-command';
import { onCheckPlayLevelCommand } from './on-check-play-level-camand ';
import { onTutorialClickCommand } from './on-tutorial-click-command';
import { onUpdatePlayLevelCommand } from './on-update-play-level-camand ';
import { showAnimationCommand } from './show-animation-command';

export const onPadClickCommand = (padId: string): void => {
    lego.command

        .execute(onTutorialClickCommand)

        .guard(
            tutorialGuard,
            () => store.playable.tutorial.currentIndex === 1 || store.playable.tutorial.currentIndex === 3,
        )
        .execute(completeTutorialSequenceCommand)

        .payload(padId)
        .guard(isBoardStateLevelCompleteGuard)
        .execute(onCheckPlayLevelCommand)
        // //
        .payload(padId)
        .guard(boardStatePlayGuard, boardProgressIsNullGuard)
        .execute(onUpdatePlayLevelCommand)

        .payload(padId)
        .guard(boardStatePlayGuard)
        .execute(showAnimationCommand)

        .payload(padId)
        .guard(boardStatePlayGuard, lego.not(boardProgressIsNullGuard))
        .execute(onCheckPlayLevelCommand)

        .payload(padId)
        .guard(isBoardStateAggressiveCtaCompleteGuard)
        .execute(goToCTACommand);
};
