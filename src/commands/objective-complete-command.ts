import { CtaRevelationReason } from '../models/cta-model';
import { store } from '../models/store';

export const objectiveCompleteCommand = (): void => {
    const { cta } = store.playable;
    cta.reveal(CtaRevelationReason.complete, 2.5);
};
