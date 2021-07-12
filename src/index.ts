import { lego } from '@armathai/lego';
import { startupCommand } from './commands/startup-command';
import { PlayableEvent } from './events/playable';
import './playable-pixi';

(() => {
    if (process.env.NODE_ENV !== 'production' && __LEGOLOGGER__) {
        const { legologger } = require('@armathai/lego-logger');
        legologger.start(lego, {});
    }
    lego.command.on(PlayableEvent.init, startupCommand);
})();
