import gsap from 'gsap';
import { Circle, Point, Sprite } from 'pixi.js';
import { circleSample, makeTexture, postRunnable } from '../utils';
import { Container } from '../utils/container';

export class Emitter extends Container {
    private _particles: Particle[];
    public constructor(config: EmitterConfig) {
        super();
        this._crateParticles(config);
    }

    public get particles(): Particle[] {
        return this._particles;
    }

    public stop(): void {
        this._particles.forEach((p) => {
            p.stop();
        });
    }

    public play(): void {
        this._particles.forEach((p) => {
            p.play();
        });
    }

    private _crateParticles(config: EmitterConfig): void {
        const { count, diameter, color, x, y } = config;
        this._particles = [];

        const circle = new Circle(x, y, diameter);
        const points = circleSample(circle, count);

        for (let i = 1; i < points.length - 1; i++) {
            const point = points[i];
            console.warn(point);

            const particle = new Particle(
                config.frames,
                point,
                { x: x + diameter / 2, y: y + diameter / 2 },
                config.particleConfig,
            ); //point.x, point.y);

            this.addChild(particle);
            this._particles.push(particle);
            particle.tint = color;
        }
    }
}

class Particle extends Sprite {
    private _config: {
        scale?: number;
        speed?: number;
        duration?: number;
        explodeFactor?: number;
        rotation?: number;
    };
    private _centerC: Point;

    private _tween1: gsap.core.Tween;
    private _tween2: gsap.core.Tween;

    public constructor(
        texture: TextureConfig,
        point: Point,
        center: { x: number; y: number },
        config?: {
            scale?: number;
            speed?: number;
            duration?: number;
            explodeFactor?: number;
            rotation?: number;
        },
    ) {
        super(makeTexture(texture));
        this.position.set(point.x, point.y);
        this._config = config;

        this.anchor.set(0.5);
        this.scale.set(0.3 + Math.random());
        this._centerC = new Point(center.x, center.y);
        postRunnable(() => {
            this._crateTweens();
        });
    }

    public play(): void {
        // this._tween1.play();
        // this._tween2.play();
    }

    public stop(): void {
        // this._tween1.kill();
    }

    private _crateTweens(): void {
        this._tween1 = gsap.to(this, {
            // x: sampleNext(this.position, this._centerC, 5).x + this._config.explodeFactor,
            // y: sampleNext(this.position, this._centerC, 5).y + this._config.explodeFactor,
            // alpha: Math.random() * 0.0001,
            // ease: 'linear.none',
            // duration: this._config.duration - 0.55,
            // repeat: -1,
            // repeatDelay: 0.55,
            rotation: this._config.rotation,
            alpha: Math.random() * 0.0001,
            ease: 'linear.none',
            duration: this._config.duration - 0.55,
            repeat: -1,
            repeatDelay: 0.55,
        });
        // this._tween1.kill();
    }
}
