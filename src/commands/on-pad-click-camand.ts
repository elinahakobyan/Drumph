import { lego } from '@armathai/lego';
import { boardProgressGuard } from '../guards/board-progres-guard';
import { boardStateImitationFinishGuard } from '../guards/board-state-finish-imitacia-guard';
import { boardStatePlayGuard } from '../guards/board-state-play-guard';
import { destroyTutorialModelCommand } from './destroy-tutorial-model-command';
import { onCheckPlayLevelCommand } from './on-check-play-level-camand ';
import { onUpdatePlayLevelCommand } from './on-update-play-level-camand ';

export const onPadClickCommand = (padId: string): void => {
    lego.command
        .guard(boardStateImitationFinishGuard)

        .execute(destroyTutorialModelCommand)
        .payload(padId)
        .guard(boardStatePlayGuard, boardProgressGuard)
        .execute(onCheckPlayLevelCommand)
        //
        .payload(padId)
        .guard(boardStatePlayGuard, lego.not(boardProgressGuard))
        .execute(onUpdatePlayLevelCommand, onCheckPlayLevelCommand);
    //
};
