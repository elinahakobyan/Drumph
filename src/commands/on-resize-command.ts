import { lego } from '@armathai/lego';
import { hintModelGuard } from '../guards/hint-model-guard';
import { updateHintStateCommand } from './update-hint-state-command';

export const onResizeCommand = (): void => {
    lego.command.guard(hintModelGuard).execute(updateHintStateCommand);
};
