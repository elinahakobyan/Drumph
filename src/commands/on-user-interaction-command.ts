import { lego } from '@armathai/lego';
import { boardIdleStateGuard } from '../guards/board-idle-state-guard';
import { hintModelGuard } from '../guards/hint-model-guard';
import { BoardState } from '../models/board-model';
import { store } from '../models/store';
import { onStartBoardLevelImitaciaCommand } from './on-start-bord-level-imitacia-commad';
import { updateBoardStateCommand } from './on-update-bord-state-commad';
import { updateHintStateCommand } from './update-hint-state-command';

export const onUserInteractionCommand = (): void => {
    store.playable.cta.interaction();

    lego.command
        .guard(hintModelGuard)
        .execute(updateHintStateCommand)
        .guard(boardIdleStateGuard)
        .payload(BoardState.imitation)
        .execute(updateBoardStateCommand, onStartBoardLevelImitaciaCommand);
    // .guard(boardBeforeTutorialGuard);
    // .payload(BoardState.imitacia)
    // .execute(updateHintStateCommand);
};
