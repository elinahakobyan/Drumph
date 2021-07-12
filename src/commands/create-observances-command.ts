/* eslint-disable @typescript-eslint/naming-convention */
import { lego } from '@armathai/lego';
import { soundGuard } from '../guards/sound-guard';
import { PlayableObservant } from '../observances/playable-observant';

export const createObservancesCommand = async (): Promise<void> => {
    new PlayableObservant();

    if (process.env.NODE_ENV !== 'production') {
        const { StatsObservant } = require('../observances/stats-observant');
        new StatsObservant();
    }

    if (__SOUND__) {
        const { SoundObservant } = require('../observances/sound-observant');
        lego.command.guard(soundGuard).execute(() => new SoundObservant());
    }
};
