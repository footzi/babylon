import {Camera, ArcRotateCamera, Vector3, Scene} from 'babylonjs';
export class CityCamera {
    camera: ArcRotateCamera | null;
    scene: Scene;
    canvas: HTMLCanvasElement;

    constructor(scene: Scene, canvas: HTMLCanvasElement) {
        this.camera = null;
        this.scene = scene;
        this.canvas = canvas;
    }
    init() {
        this.camera = new ArcRotateCamera(
            'camera',
            -Math.PI / 2,
            Math.PI / 4,
            5,
            new Vector3(0, 0, 0),
            this.scene,
        );

        // this.camera.minZ = 0.1;
        // this.camera.maxZ = 2200;
        // this.camera.lowerBetaLimit = 0.4;
        // this.camera.upperBetaLimit = 1.55;
        // this.camera.lowerRadiusLimit = 2;
        // this.camera.upperRadiusLimit = 1200;

        this.camera.attachControl(this.canvas, true);
        // this.camera.attachControl(true, true, 0);

        return this.camera;
    }
}
