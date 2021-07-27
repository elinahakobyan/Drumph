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
        .guard(boardStatePlayGuard, lego.not(boardprogresGuard))
        .payload(padId)
        .execute(onUpadatePlayLevelCommand, onCheckPlayLevelCommand)
        .guard(boardStatePlayGuard, boardprogresGuard)
        .payload(padId)
        .execute(onCheckPlayLevelCommand);
    console.warn(padId);
};
