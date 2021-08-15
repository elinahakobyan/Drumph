import { ParticleEmitterConfig } from '@armathai/pixi-particles';
import { particles } from '../../assets/particles';

export const getTraditionalCtaConfettiParticleConfig = (x: number, y: number): ParticleConfig => {
    return {
        x,
        y,
        data: particles.confetti,
    };
};

export const getPadAnimationParticleConfig = (x: number, y: number): ParticleConfig => {
    return {
        x,
        y,
        data: particles.confetti,
    };
};

export const getPadAnimationParticleEmitterConfig = (): ParticleEmitterConfig => {
    return {
        velocity: { highMin: 12, highMax: 20 },
        life: { lowMin: 5, lowMax: 15, independent: true },
        textures: ['fx_particle'],
    };
};

// force: { x: 0, y: -0.04 },
//     config: {
//       zone: CI_API.game.particleStorm.createCircleZone(18),
//       total: 6,
//       repeat: 0
