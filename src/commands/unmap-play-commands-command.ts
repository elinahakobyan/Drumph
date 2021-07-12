import { lego } from '@armathai/lego';
import { TutorialModelEvent } from '../events/model';
import { MainViewEvent, TutorialViewEvent } from '../events/view';
import { onTutorialClickCommand } from './on-tutorial-click-command';
import { onTutorialCompleteCommand } from './on-tutorial-complete-command';
import { onTutorialHideCompleteCommand } from './on-tutorial-hide-complete-command';
import { onUserInteractionCommand } from './on-user-interaction-command';

export const unmapPlayCommandsCommand = (): void => {
    lego.command
        .off(TutorialModelEvent.completeUpdate, onTutorialCompleteCommand)
        .off(TutorialViewEvent.click, onTutorialClickCommand)
        .off(TutorialViewEvent.hideComplete, onTutorialHideCompleteCommand)
        .off(MainViewEvent.click, onUserInteractionCommand);
};
