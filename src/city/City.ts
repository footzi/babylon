import * as BABYLON from 'babylonjs';
import {paintGround} from './ground';
import {paintRoads} from './road';
import {CameraHammerInput} from './CameraHammerInput';
import {MyCamera} from './CameraHammerInput/my';

export class City {
    canvas: HTMLCanvasElement;
    engine: BABYLON.Engine;
    scene: BABYLON.Scene;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.engine = new BABYLON.Engine(canvas, true);

        this.scene = this.createScene();

        window.addEventListener('resize', () => this.engine.resize());
        this.engine.runRenderLoop(() => this.scene.render());
    }

    createScene(): BABYLON.Scene {
        const scene = new BABYLON.Scene(this.engine);

        this.createCamera();
        this.createLight();
        this.createModels();

        return scene;
    }

    createLight() {
        new BABYLON.HemisphericLight(
            'light',
            new BABYLON.Vector3(0, 1, 0),
            this.scene,
        );
    }

    createCamera() {
        const camera = new BABYLON.ArcRotateCamera(
            'camera',
            0,
            0,
            0,
            new BABYLON.Vector3(0, 0, 0),
            this.scene,
        );

        camera.minZ = 0.1;
        camera.maxZ = 2200;
        camera.lowerBetaLimit = 0.4;
        camera.upperBetaLimit = 1.55;
        camera.lowerRadiusLimit = 2;
        camera.upperRadiusLimit = 1200;

        camera.attachControl(this.canvas, true);

        const input = new CameraHammerInput();
        const myInput = new MyCamera();
        // camera.inputs.add(input);
        camera.inputs.add(myInput);
    }

    createModels() {
        paintGround();
        paintRoads();
    }
}
