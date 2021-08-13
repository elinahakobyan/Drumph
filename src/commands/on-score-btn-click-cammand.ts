import { lego } from '@armathai/lego';
import { getLevel2TutorialConfig, getTutorialConfig } from '../constants/configs/tutorial-config';
import { isFirstLevelGuard } from '../guards/is-first-level-guard';
import { isSecondLevelGuard } from '../guards/is-second-level-guard';
import { tutorialGuard } from '../guards/tutorial-guard';
import { tutorialModelGuard } from '../guards/tutorial-model-guard';
import { store } from '../models/store';
import { destroyTutorialModelCommand } from './destroy-tutorial-model-command';
import { initializeTutorialModelCommand } from './initialize-tutorial-model-command';

export const onScoreBtnClickCommand = (text: string): void => {
    const level = store.play.board.level;
    console.warn(level);

    if (text === 'Next') {
        store.play.board.rebuildLevel();
        store.play.board.onLevelUpdate(level + 1);
    } else if (text === 'Try again') {
        // console.warn('try again ');
        store.play.board.rebuildLevel();
        lego.command
            .guard(tutorialModelGuard)
            .execute(destroyTutorialModelCommand)

            .guard(tutorialGuard, isFirstLevelGuard)
            .payload(getTutorialConfig())
            .execute(initializeTutorialModelCommand)

            .guard(tutorialGuard, isSecondLevelGuard)
            .payload(getLevel2TutorialConfig())
            .execute(initializeTutorialModelCommand);

        store.play.board.onLevelUpdate(level);
    }
};
