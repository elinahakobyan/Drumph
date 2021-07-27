import { lego } from '@armathai/lego';
import { boardStateImitaciaFinishGuard } from '../guards/board-state-finish-imitacia-guard';
import { boardStateImitaciaGuard } from '../guards/board-state-imitacia-guard';
import { BoardState } from '../models/board-model';
import { updateBoardStateCommand } from './on-update-bord-state-commad';

export const onCheckBoardStateCommand = (): void => {
    lego.command
        .guard(boardStateImitaciaGuard, lego.not(boardStateImitaciaFinishGuard))
        .payload(BoardState.play)
        .execute(updateBoardStateCommand);

    //
};
