import { PlayableState } from '../models/playable-model';
import { store } from '../models/store';

export const setPlayableStateCommand = (state: PlayableState): void => {
    store.playable.state = state;
};
