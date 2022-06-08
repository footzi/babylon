import {ArcRotateCamera, ICameraInput, Vector3} from '@babylonjs/core';
import Hammer from 'hammerjs';
import {CONFIG} from '../config';
import {ui} from '../UI';
import {EVENTS} from '../interfaces';

export class CityCamera implements ICameraInput<ArcRotateCamera> {
    public camera!: ArcRotateCamera;

    private canvas: HTMLCanvasElement;

    public panTresholdInPixels = 0;

    private startCenterX = 0;
    private startCenterY = 0;

    public xPanningRatioSingleTouch = 0.14;
    public zPanningRatioSingleTouch = 0.18;

    private targetAlpha = CONFIG.camera.alpha;
    private targetBeta = CONFIG.camera.beta;
    private targetRadius = CONFIG.camera.radius;
    private panDistanceInfluence = CONFIG.camera.panDistanceInfluence;

    private targetPosition = new Vector3();
    private targetTarget = new Vector3();

    private startTarget = Vector3.Zero();
    private startPosition = Vector3.Zero();

    private targetFov = CONFIG.camera.fov;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    public attachControl(noPreventDefault?: boolean) {
        const engine = this.camera.getEngine();
        const element = <EventTarget>engine.getInputElement();
        const manager = new Hammer.Manager(element);

        const pan = new Hammer.Pan({threshold: this.panTresholdInPixels});

        manager.add(pan);

        manager.on('panstart', (event) => this.panStart(event));
        manager.on('pan', (e) => this.pan(e));
        manager.on('hammer.input', (e: HammerInput) => {
            if (e.isFirst) {
                this.initStartValues();
                this.initTargetValues();
            }
        });

        this.canvas.addEventListener('wheel', (e: WheelEvent) => {
            if (CONFIG.camera.borders) {
                const deltaY = e.deltaY;
                this.setFov(deltaY);
                this.setBeta(deltaY);
            }
        });

        this.camera.getScene().onBeforeRenderObservable.add(() => {
            this.setBorders();

            this.camera.target = this.targetTarget;
            this.camera.position = this.targetPosition;

            this.camera.alpha = this.targetAlpha;
            this.camera.beta = this.targetBeta;
            this.camera.radius = this.targetRadius;
            this.camera.fov = this.targetFov;
        });
    }

    private panStart(event: HammerInput) {
        this.startCenterX = event.pointers[0].clientX;
        this.startCenterY = event.pointers[0].clientY;
    }

    private pan(event: HammerInput) {
        const dx = -(this.startCenterX - event.pointers[0].clientX);
        const dy = this.startCenterY - event.pointers[0].clientY;

        this.panMove(
            dx * this.xPanningRatioSingleTouch * this.panDistanceInfluence,
            dy * this.zPanningRatioSingleTouch * this.panDistanceInfluence,
        );
    }

    private panMove(dx: number, dy: number) {
        const alpha = this.camera.alpha - Math.PI / 2;
        const c = Math.cos(alpha);
        const s = Math.sin(alpha);
        const x1 = dx;
        const y1 = dy;
        const x2 = c * x1 - s * y1;
        const y2 = s * x1 + c * y1;

        this.targetTarget.x = this.startTarget.x + x2;
        this.targetTarget.z = this.startTarget.z + y2;

        this.targetPosition.x = this.startPosition.x + x2;
        this.targetPosition.z = this.startPosition.z + y2;

        ui.dispatchEvent(EVENTS.PAN_CANVAS);
    }

    public getClassName(): string {
        return 'CityCamera';
    }

    public getSimpleName(): string {
        return 'CityCamera';
    }

    public detachControl() {}

    private initStartValues() {
        this.startPosition = this.camera.position.clone();
        this.startTarget = this.camera.target.clone();
    }

    private initTargetValues() {
        this.targetAlpha = this.camera.alpha;
        this.targetBeta = this.camera.beta;
        this.targetRadius = this.camera.radius;
        this.targetPosition = this.camera.position.clone();
        this.targetTarget = this.camera.target.clone();
    }

    private setBorders() {
        const {camera} = CONFIG;

        if (!camera.borders) {
            return;
        }
        const {maxZ, minZ, maxX, minX} = camera.borders;

        if (this.targetTarget.z >= maxZ) {
            this.targetTarget.z = maxZ;
        }

        if (this.targetTarget.z <= minZ) {
            this.targetTarget.z = minZ;
        }

        if (this.targetTarget.x >= maxX) {
            this.targetTarget.x = maxX;
        }

        if (this.targetTarget.x <= minX) {
            this.targetTarget.x = minX;
        }
    }

    // Зум
    private setFov(deltaY: number) {
        const {camera} = CONFIG;

        if (!camera.borders) {
            return;
        }

        const calcFov = this.targetFov + deltaY / camera.fovRatio;

        if (calcFov < camera.fov && calcFov > camera.borders.minFov) {
            this.targetFov = calcFov;
        }

        // сбрасываем к дефолтным значениям если выходит за рамки
        if (calcFov > camera.fov) {
            this.targetFov = CONFIG.camera.fov;
        }

        if (calcFov < camera.borders.minFov) {
            this.targetFov = camera.borders.minFov;
        }

        ui.dispatchEvent(EVENTS.ZOOM_CANVAS);
    }

    // Наклон камеры
    setBeta(deltaY: number) {
        const {camera} = CONFIG;

        if (!camera.borders?.maxBeta) {
            return;
        }

        const calcBeta = this.targetBeta - deltaY / camera.betaRatio;

        if (calcBeta > camera.beta && calcBeta < camera.borders.maxBeta) {
            this.targetBeta = calcBeta;
        }

        // сбрасываем к дефолтным значениям если выходит за рамки
        if (calcBeta < camera.beta) {
            this.targetBeta = camera.beta;
        }

        if (calcBeta > camera.borders.maxBeta) {
            this.targetBeta = camera.borders.maxBeta;
        }
    }
}
