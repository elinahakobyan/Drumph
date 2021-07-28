import { lego } from '@armathai/lego';
import { boardprogresGuard as boardProgressGuard } from '../guards/board-progres-guard';
import { boardStateImitationFinishGuard } from '../guards/board-state-finish-imitacia-guard';
import { boardStatePlayGuard } from '../guards/board-state-play-guard';
import { destroyTutorialModelCommand } from './destroy-tutorial-model-command';
import { onCheckPlayLevelCommand } from './on-check-play-level-camand ';
import { onUpadatePlayLevelCommand as onUpdatePlayLevelCommand } from './on-update-play-level-camand ';

export const onPadClickCommand = (padId: string): void => {
    lego.command
        .guard(boardStateImitationFinishGuard)
        .execute(destroyTutorialModelCommand)
        .guard(boardStatePlayGuard, lego.not(boardProgressGuard))
        .payload(padId)
        .execute(onUpdatePlayLevelCommand, onCheckPlayLevelCommand)
        .guard(boardStatePlayGuard, boardProgressGuard)
        .payload(padId)
        .execute(onCheckPlayLevelCommand);
    console.warn(padId);
};
