import { lego } from '@armathai/lego';
import { BoardModelEvent, TutorialModelEvent, TutorialSequenceModelEvent } from '../events/model';
import { MainViewEvent, PadViewEvent, PlayViewEvent, TutorialViewEvent } from '../events/view';
import { onBoardProgressUpdate } from './on-board-progress-update-camand';
import { onBoardStateUpdateCommand } from './on-board-state-update-command';
import { onBoardTimerUpdateCommand } from './on-board-timer-update-camand';
import { onCheckLevelScoreCommand } from './on-check-level-score-camand';
import { onPadClickCommand } from './on-pad-click-camand';
import { onScoreBtnClickCommand } from './on-score-btn-click-cammand';
import { onTutorialClickCommand } from './on-tutorial-click-command';
import { onTutorialCompleteCommand } from './on-tutorial-complete-command';
import { onTutorialHideCompleteCommand } from './on-tutorial-hide-complete-command';
import { onTutorialSequenceCompleteCommand } from './on-tutorial-sequence-complete-command';
import { onUserInteractionCommand } from './on-user-interaction-command';

export const mapPlayCommandsCommand = (): void => {
    lego.command
        .on(TutorialModelEvent.completeUpdate, onTutorialCompleteCommand)
        .on(TutorialViewEvent.click, onTutorialClickCommand)
        .on(TutorialViewEvent.sequenceHideComplete, onTutorialHideCompleteCommand)
        .on(BoardModelEvent.stateUpdate, onBoardStateUpdateCommand)

        .on(PadViewEvent.click, onPadClickCommand)
        .on(BoardModelEvent.progressUpdate, onBoardProgressUpdate)
        .on(BoardModelEvent.entryTimerUpdate, onBoardTimerUpdateCommand)
        .on(BoardModelEvent.statusUpdate, onCheckLevelScoreCommand)
        .on(TutorialSequenceModelEvent.completeUpdate, onTutorialSequenceCompleteCommand)
        .on(PlayViewEvent.onScoreBtnClick, onScoreBtnClickCommand)
        .on(MainViewEvent.click, onUserInteractionCommand);
};
