import { store } from '../models/store';

export const creatLevelPatternCommands = (): void => {
    const level = store.play.board ? store.play.board.level : null;
    level ? (store.play.board.level = level + 1) : (store.play.board.level = 1);

    // lego.command.payload(PlayableState.retry).execute(setPlayableStateCommand);
};
