import { lego } from '@armathai/lego';
import { tutorialGuard } from '../guards/tutorial-guard';
import { tutorialModelGuard } from '../guards/tutorial-model-guard';
import { store } from '../models/store';
import { destroyTutorialModelCommand } from './destroy-tutorial-model-command';
import { initializeTutorialModelCommand } from './initialize-tutorial-model-command';

export const onScoreBtnClickCommand = (text: string): void => {
    const level = store.play.board.level;
    console.warn(text);

    if (text === 'Next') {
        store.play.board.rebuildLevel();
        store.play.board.onLevelUpdate(level + 1);
    } else if (text === 'Try again') {
        // console.warn('try again ');
        store.play.board.rebuildLevel();
        lego.command
            .guard(tutorialModelGuard)
            .execute(destroyTutorialModelCommand)

            .guard(tutorialGuard)
            .execute(initializeTutorialModelCommand);

        store.play.board.onLevelUpdate(level);
    }

    // if (level === 2) {
    //     console.warn('agressiv cta');
    //     store.play.board.rebuildLevel();
    //     store.play.board.onLevelUpdate(level + 1);

    //     // store.play.board.startImitation();
    // } else if (store.play.board.score > 0) {
    //     console.warn('to next level ');
    //     store.play.board.rebuildLevel();
    //     store.play.board.onLevelUpdate(level + 1);
    // } else {
    //     console.warn('try again ');
    //     store.play.board.rebuildLevel();
    //     lego.command
    //         .guard(tutorialModelGuard)
    //         .execute(destroyTutorialModelCommand)

    //         .guard(tutorialGuard)
    //         .execute(initializeTutorialModelCommand);

    //     store.play.board.onLevelUpdate(level);
    // }
    //
};
