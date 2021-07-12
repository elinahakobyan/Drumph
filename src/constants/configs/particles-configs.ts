import { particles } from '../../assets/particles';

export const getTraditionalCtaConfettiParticleConfig = (x: number, y: number): ParticleConfig => {
    return {
        x,
        y,
        data: particles.confetti,
    };
};
