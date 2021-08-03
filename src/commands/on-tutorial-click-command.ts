import { lego } from '@armathai/lego';
import { completeTutorialSequenceCommand } from './complete-tutorial-sequence-command';

export const onTutorialClickCommand = (): void => {
    lego.command.execute(completeTutorialSequenceCommand);
};
