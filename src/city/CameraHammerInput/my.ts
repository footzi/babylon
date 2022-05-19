import {ArcRotateCamera, ICameraInput, Vector3} from 'babylonjs';
import Hammer from 'hammerjs';

export class MyCamera implements ICameraInput<ArcRotateCamera> {
    public camera!: ArcRotateCamera;

    public panTresholdInPixels = 40;

    private startCenterX = 0;
    private startCenterY = 0;

    public xPanningRatioSingleTouch = 0.14;
    public zPanningRatioSingleTouch = 0.18;

    private targetAlpha = -Math.PI / 2;
    private targetBeta = Math.PI / 2.5;
    private targetRadius = 3;

    private targetPosition = new Vector3();
    private targetTarget = new Vector3();

    private startTarget = Vector3.Zero();
    private startPosition = Vector3.Zero();

    attachControl(noPreventDefault?: boolean) {
        const engine = this.camera.getEngine();
        const element = <EventTarget>engine.getInputElement();
        const manager = new Hammer.Manager(element);

        const pan = new Hammer.Pan({threshold: this.panTresholdInPixels});

        manager.add(pan);

        // register hammerjs events
        manager.on('panstart', (event) => this.panStart(event));
        manager.on('pan', (e) => this.pan(e));
        // manager.on('panend', (e) => this.panEnd());

        this.camera.getScene().onBeforeRenderObservable.add(() => {
            this.camera.target = this.targetTarget;
            this.camera.position = this.targetPosition;
            this.camera.alpha = this.targetAlpha;
            this.camera.beta = this.targetBeta;
            this.camera.radius = this.targetRadius;
        });
    }

    panStart(event: HammerInput) {
        console.log(event.pointers[0]);

        this.startCenterX = event.pointers[0].clientX;
        this.startCenterY = event.pointers[0].clientY;
    }

    pan(event: HammerInput) {
        const panDistanceInfluence = 1;
        const dx = -(this.startCenterX - event.pointers[0].clientX);
        const dy = this.startCenterY - event.pointers[0].clientY;
        this.panMove(
            dx * this.xPanningRatioSingleTouch * panDistanceInfluence,
            dy * this.zPanningRatioSingleTouch * panDistanceInfluence,
        );
    }

    panMove(dx: number, dy: number) {
        // rotate the position according to camera.alpha
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
    }

    /**
     * Gets the class name of the current input.
     * @returns the class name
     */
    public getClassName(): string {
        return 'ArcRotateCameraHammerJsInput';
    }

    /**
     * Get the friendly name associated with the input class.
     * @returns the input friendly name
     */
    public getSimpleName(): string {
        return 'ArcRotateCameraHammerJsInput';
    }

    detachControl() {}
}
