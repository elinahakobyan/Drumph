import { store } from '../models/store';

export const onSoundToggleComponentClickCommand = (): void => {
    store.playable.sound.toggleMute();
};
