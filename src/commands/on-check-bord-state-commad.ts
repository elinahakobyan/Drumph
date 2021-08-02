import { lego } from '@armathai/lego';
import { boardStateImitationFinishGuard } from '../guards/board-state-finish-imitacia-guard';
import { boardStateImitationGuard } from '../guards/board-state-imitacia-guard';
import { boardStatePlayGuard } from '../guards/board-state-play-guard';
import { BoardState } from '../models/board-model';
import { updateBoardStateCommand } from './on-update-bord-state-commad';
import { showResultCommand } from './show-result-command';

export const onCheckBoardStateCommand = (): void => {
    return;
    lego.command
        .guard(boardStatePlayGuard)
        .payload(BoardState.idle)
        .execute(showResultCommand)
        .guard(boardStateImitationGuard, lego.not(boardStateImitationFinishGuard))
        .payload(BoardState.play)
        .execute(updateBoardStateCommand);

    //
};
