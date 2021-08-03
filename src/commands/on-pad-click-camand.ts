import { lego } from '@armathai/lego';
import { boardProgressIsNullGuard } from '../guards/board-progres-is-null-guard';
import { boardStatePlayGuard } from '../guards/board-state-play-guard';
import { onCheckPlayLevelCommand } from './on-check-play-level-camand ';
import { onUpdatePlayLevelCommand } from './on-update-play-level-camand ';

export const onPadClickCommand = (padId: string): void => {
    console.warn('click');

    lego.command
        // .guard(boardStateImitationFinishGuard)

        // .execute(destroyTutorialModelCommand)
        // .payload(padId)
        // .guard(boardStatePlayGuard, boardProgressGuard)
        // .execute(onCheckPlayLevelCommand)
        // //
        .payload(padId)
        .guard(boardStatePlayGuard, boardProgressIsNullGuard)
        .execute(onUpdatePlayLevelCommand, onCheckPlayLevelCommand)
        //
        .payload(padId)
        .guard(boardStatePlayGuard, lego.not(boardProgressIsNullGuard))
        .execute(onCheckPlayLevelCommand);
    //
};
