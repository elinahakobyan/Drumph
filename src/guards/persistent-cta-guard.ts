import { getParams } from '../utils';

export const persistentCtaGuard = (): boolean => {
    return getParams().persistentCtaBtn.value;
};
