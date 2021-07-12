import { getParams } from '../utils';

export const tutorialGuard = (): boolean => {
    return getParams().tutorial.value;
};
