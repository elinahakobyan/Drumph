import { store } from '../models/store';

export const incrementRetriesCountCommand = (): void => {
    ++store.playable.retriesCount;
};
