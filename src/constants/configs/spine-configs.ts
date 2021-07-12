import { spines } from '../../assets/spines';

export const getPowerupSpineConfig = (): SpineConfig => {
    return {
        skeleton: spines.powerup.skeleton,
        speed: 1,
    };
};
