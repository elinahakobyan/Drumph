import { lego } from '@armathai/lego';
import { TutorialModelEvent } from '../events/model';
import { MainViewEvent, TutorialViewEvent } from '../events/view';
import { onTutorialClickCommand } from './on-tutorial-click-command';
import { onTutorialCompleteCommand } from './on-tutorial-complete-command';
import { onUserInteractionCommand } from './on-user-interaction-command';

export const mapPlayCommandsCommand = (): void => {
    lego.command
        .on(TutorialModelEvent.completeUpdate, onTutorialCompleteCommand)
        .on(TutorialViewEvent.click, onTutorialClickCommand)
        // .on(TutorialViewEvent.hideComplete, onTutorialHideCompleteCommand)
        .on(MainViewEvent.click, onUserInteractionCommand);
};
