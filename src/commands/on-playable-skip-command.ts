import { CtaRevelationReason } from '../models/cta-model';
import { store } from '../models/store';

export const onPlayableSkipCommand = (): void => {
    const { cta } = store.playable;
    cta.reveal(CtaRevelationReason.skip);
};
