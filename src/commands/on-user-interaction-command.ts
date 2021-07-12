import { lego } from '@armathai/lego';
import { hintModelGuard } from '../guards/hint-model-guard';
import { store } from '../models/store';
import { updateHintStateCommand } from './update-hint-state-command';

export const onUserInteractionCommand = (): void => {
    store.playable.cta.interaction();

    lego.command.guard(hintModelGuard).execute(updateHintStateCommand);
};
