import { lego } from '@armathai/lego';
import { isBoardStateAggressiveCtaCompleteGuard } from '../guards/is-board-state-aggressive-cta-camplete-guard';
import { BoardState } from '../models/board-model';
import { store } from '../models/store';
import { activateAggressivePadsCommand } from './activate-aggressive-pads-command';
import { setBoardStateCommand } from './set-board-state-commad';

export function onTutorialSequenceCompleteCommand(value: boolean, prevValue: boolean, uuid: string): void {
    const { index } = store.playable.tutorial.getSequenceByUuid(uuid);

    lego.command
        //
        .payload(BoardState.imitation)
        .guard(() => index === 0 || (index === 2 && store.playable.tutorial.sequences.length !== 3))
        .execute(setBoardStateCommand)

        .guard(isBoardStateAggressiveCtaCompleteGuard)
        .execute(activateAggressivePadsCommand);
}
