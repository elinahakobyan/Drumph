import { lego } from '@armathai/lego';
import { BoardState } from '../models/board-model';
import { store } from '../models/store';
import { setBoardStateCommand } from './set-board-state-commad';

export function onTutorialSequenceCompleteCommand(value: boolean, prevValue: boolean, uuid: string): void {
    const { index } = store.playable.tutorial.getSequenceByUuid(uuid);

    lego.command
        //
        .payload(BoardState.imitation)
        .guard(() => index === 0 || index === 2)
        .execute(setBoardStateCommand);
}
