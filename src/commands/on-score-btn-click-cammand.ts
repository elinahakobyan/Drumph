import { store } from '../models/store';

export const onScoreBtnClickCommand = (): void => {
    const level = store.play.board.level;
    if (level === 3) {
        console.warn('agressiv cta');
    } else if (store.play.board.score > 0) {
        console.warn('to next level ');
        store.play.board.rebuildLevel();
        store.play.board.onLevelUpdate(level + 1);
    } else {
        console.warn('try again ');
    }
    //
};