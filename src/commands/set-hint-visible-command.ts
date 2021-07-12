import { store } from '../models/store';

export const setHintVisibleCommand = (value: boolean): void => {
    store.playable.hint.visible = value;
};
