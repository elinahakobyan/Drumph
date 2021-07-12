import { lego } from '@armathai/lego';
import { destroyTutorialModelCommand } from './destroy-tutorial-model-command';

export const onTutorialHideCompleteCommand = (): void => {
    lego.command.execute(destroyTutorialModelCommand);
};
