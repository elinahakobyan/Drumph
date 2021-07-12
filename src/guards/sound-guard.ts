import { getParams } from '../utils';

export const soundGuard = (): boolean => {
    return getParams().sound.value;
};
