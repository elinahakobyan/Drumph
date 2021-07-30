import { lego } from '@armathai/lego';
import { boardStateImitaciaFinishGuard } from '../guards/board-state-finish-imitacia-guard';
import { boardStateImitaciaGuard } from '../guards/board-state-imitacia-guard';
import { boardStatePlayGuard } from '../guards/board-state-play-guard';
import { BoardState } from '../models/board-model';
import { updateBoardStateCommand } from './on-update-bord-state-commad';
import { showResultCommand } from './show-result-command';

export const onCheckBoardStateCommand = (): void => {
    lego.command
        .guard(boardStatePlayGuard)
        .payload(BoardState.showResult)
        .execute(showResultCommand)
        .guard(boardStateImitaciaGuard, lego.not(boardStateImitaciaFinishGuard))
        .payload(BoardState.play)
        .execute(updateBoardStateCommand);
    //
};
