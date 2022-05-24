import * as BABYLON from 'babylonjs';
import {paintGround} from './ground';
import {paintRoads} from './road';
import {CityCamera} from './CityCamera';
import {CONFIG} from './config';
import {paintBuildings} from './Building';

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

        if (CONFIG.isDebugLayer) {
            this.scene.debugLayer.show();
        }
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
            -Math.PI / 2,
            0,
            0,
            new BABYLON.Vector3(0, 0, 0),
            this.scene,
        );

        // var camera = new BABYLON.FreeCamera(
        //     'UniversalCamera',
        //     new BABYLON.Vector3(0, 0, 0),
        //     this.scene,
        // );

        // Targets the camera to a particular position. In this case the scene origin
        // camera.setTarget(BABYLON.Vector3.Zero());

        // camera.minZ = 0.1;
        // camera.maxZ = 10;
        // // camera. = 2;
        // camera.lowerBetaLimit = 0.4;
        // camera.upperBetaLimit = 1.55;
        // camera.lowerRadiusLimit = 2;
        // camera.upperRadiusLimit = 1200;

        camera.attachControl(this.canvas, true);

        // const input = new CameraHammerInput();

        if (CONFIG.isMouseDrag) {
            const input = new CityCamera();
            camera.inputs.add(input);
        }
    }

    createModels() {
        paintGround();

        paintBuildings(this.scene);
        // paintRoads();

        // const box = BABYLON.MeshBuilder.CreateBox('box', {});
    }
}
