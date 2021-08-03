import { lego } from '@armathai/lego';
import { isPlayStateGuard } from './is-play-state-guard';
import { showRepeatTutorialCommand } from './show-repeat-tutorialcommand';

export const onBoardStateUpdateCommand = (state: string): void => {
    lego.command.guard(isPlayStateGuard).execute(showRepeatTutorialCommand);
};
