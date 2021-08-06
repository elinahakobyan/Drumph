import { lego } from '@armathai/lego';
import { boardProgressIsNullGuard } from '../guards/board-progres-is-null-guard';
import { boardStateLevelCompleteGuard } from '../guards/board-state-level-camplete-guard';
import { boardStatePlayGuard } from '../guards/board-state-play-guard';
import { tutorialGuard } from '../guards/tutorial-guard';
import { completeTutorialSequenceCommand } from './complete-tutorial-sequence-command';
import { onCheckPlayLevelCommand } from './on-check-play-level-camand ';
import { onTutorialClickCommand } from './on-tutorial-click-command';
import { onUpdatePlayLevelCommand } from './on-update-play-level-camand ';
import { showAnimationCommand } from './show-animation-command';

export const onPadClickCommand = (padId: string): void => {
    lego.command
        .execute(onTutorialClickCommand)

        // .payload(padId)
        // .guard(boardStatePlayGuard)
        // .execute(showAnimationCommand)

        .guard(tutorialGuard)
        .execute(completeTutorialSequenceCommand)

        .payload(padId)
        .guard(boardStateLevelCompleteGuard)
        .execute(onCheckPlayLevelCommand)
        // //
        .payload(padId)
        .guard(boardStatePlayGuard, boardProgressIsNullGuard)
        .execute(onUpdatePlayLevelCommand, showAnimationCommand)

        //
        .payload(padId)
        .guard(boardStatePlayGuard, lego.not(boardProgressIsNullGuard))
        .execute(onCheckPlayLevelCommand);
    //
};
