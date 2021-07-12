import { getParams } from '../utils';

export const hintGuard = (): boolean => {
    return getParams().hint.value;
};
