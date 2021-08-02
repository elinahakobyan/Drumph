import { lego } from '@armathai/lego';
import { BoardModelEvent, TutorialModelEvent } from '../events/model';
import { MainViewEvent, PadViewEvent, ProgressUpdateViewEvent, TutorialViewEvent } from '../events/view';
import { onBoardStateUpdateCommand } from './on-board-state-update-command';
import { onCheckBoardStateCommand } from './on-check-bord-state-commad';
import { onPadClickCommand } from './on-pad-click-camand';
import { onTutorialClickCommand } from './on-tutorial-click-command';
import { onTutorialCompleteCommand } from './on-tutorial-complete-command';
import { onTutorialHideCompleteCommand } from './on-tutorial-hide-complete-command';
import { onUserInteractionCommand } from './on-user-interaction-command';

export const mapPlayCommandsCommand = (): void => {
    lego.command
        .on(TutorialModelEvent.completeUpdate, onTutorialCompleteCommand)
        .on(TutorialViewEvent.click, onTutorialClickCommand)
        .on(TutorialViewEvent.sequenceHideComplete, onTutorialHideCompleteCommand)
        .on(BoardModelEvent.stateUpdate, onBoardStateUpdateCommand)

        .on(ProgressUpdateViewEvent.finish, onCheckBoardStateCommand)
        .on(PadViewEvent.click, onPadClickCommand)
        .on(MainViewEvent.click, onUserInteractionCommand);
};
