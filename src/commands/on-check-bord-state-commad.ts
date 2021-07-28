import { lego } from '@armathai/lego';
import { boardStateImitationFinishGuard } from '../guards/board-state-finish-imitacia-guard';
import { boardStateImitationGuard } from '../guards/board-state-imitacia-guard';
import { BoardState } from '../models/board-model';
import { updateBoardStateCommand } from './on-update-bord-state-commad';

export const onCheckBoardStateCommand = (): void => {
    lego.command
        .guard(boardStateImitationGuard, lego.not(boardStateImitationFinishGuard))
        .payload(BoardState.play)
        .execute(updateBoardStateCommand);

    //
};
