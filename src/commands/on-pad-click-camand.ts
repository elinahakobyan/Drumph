import { lego } from '@armathai/lego';
import { boardprogresGuard } from '../guards/board-progres-guard';
import { boardStateImitaciaFinishGuard } from '../guards/board-state-finish-imitacia-guard';
import { boardStatePlayGuard } from '../guards/board-state-play-guard';
import { destroyTutorialModelCommand } from './destroy-tutorial-model-command';
import { onCheckPlayLevelCommand } from './on-check-play-level-camand ';
import { onUpadatePlayLevelCommand } from './on-update-play-level-camand ';

export const onPadClickCommand = (padId: string): void => {
    lego.command
        .guard(boardStateImitaciaFinishGuard)
        .execute(destroyTutorialModelCommand)
        .payload(padId)
        .guard(boardStatePlayGuard, boardprogresGuard)
        .execute(onCheckPlayLevelCommand)
        //
        .payload(padId)
        .guard(boardStatePlayGuard, lego.not(boardprogresGuard))
        .execute(onUpadatePlayLevelCommand, onCheckPlayLevelCommand);
    //
};
