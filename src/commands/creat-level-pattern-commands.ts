import { store } from '../models/store';

export const updateLevelCommand = (): void => {
    store.play.board.level
        ? store.play.board.onLevelUpdate(store.play.board.level + 1)
        : store.play.board.onLevelUpdate();

    // lego.command.payload(PlayableState.retry).execute(setPlayableStateCommand);
};
