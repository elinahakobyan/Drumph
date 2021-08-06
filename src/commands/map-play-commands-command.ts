import { lego } from '@armathai/lego';
import { BoardModelEvent, TutorialModelEvent } from '../events/model';
import { MainViewEvent, PadViewEvent, PlayViewEvent, ProgressUpdateViewEvent, TutorialViewEvent } from '../events/view';
import { ScoreComponent } from '../views/score-component';
import { onBoardProgressUpdate } from './on-board-progress-update-camand';
import { onBoardStateUpdateCommand } from './on-board-state-update-command';
import { onBoardTimerUpdateCommand } from './on-board-timer-update-camand';
import { onCheckBoardStateCommand } from './on-check-bord-state-commad';
import { onCheckLevelScoreCommand } from './on-check-level-score-camand';
import { onPadClickCommand } from './on-pad-click-camand';
import { onTutorialClickCommand } from './on-tutorial-click-command';
import { onTutorialCompleteCommand } from './on-tutorial-complete-command';
import { onTutorialHideCompleteCommand } from './on-tutorial-hide-complete-command';
import { onUserInteractionCommand } from './on-user-interaction-command';
import { updateLevelCammand } from './update-level-cammand';

export const mapPlayCommandsCommand = (): void => {
    lego.command
        .on(TutorialModelEvent.completeUpdate, onTutorialCompleteCommand)
        .on(TutorialViewEvent.click, onTutorialClickCommand)
        .on(TutorialViewEvent.sequenceHideComplete, onTutorialHideCompleteCommand)
        .on(BoardModelEvent.stateUpdate, onBoardStateUpdateCommand)

        .on(ProgressUpdateViewEvent.finish, onCheckBoardStateCommand)
        .on(PadViewEvent.click, onPadClickCommand)
        .on(BoardModelEvent.progressUpdate, onBoardProgressUpdate)
        .on(BoardModelEvent.entryTimerUpdate, onBoardTimerUpdateCommand)
        .on(BoardModelEvent.statusUpdate, onCheckLevelScoreCommand)
        .on(PlayViewEvent.onScoreBtnClick, updateLevelCammand)
        .on(MainViewEvent.click, onUserInteractionCommand);
};
