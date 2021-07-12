import { lego } from '@armathai/lego';
import { resetHintVisibilityTimerCommand } from './reset-hint-visibility-timer-command';
import { setHintVisibleCommand } from './set-hint-visible-command';

export const updateHintStateCommand = (): void => {
    lego.command
        .payload(false)
        .execute(setHintVisibleCommand)

        .execute(resetHintVisibilityTimerCommand);
};
