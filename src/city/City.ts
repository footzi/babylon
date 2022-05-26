import '@babylonjs/loaders/glTF';
import {
    HemisphericLight,
    ArcRotateCamera,
    Engine,
    Scene,
    Vector3,
} from '@babylonjs/core';
import {Ground} from './Ground';
import {Road, RoadData} from './Road';
import {CityCamera} from './CityCamera';
import {CONFIG} from './config';
import {Building} from './Building';
import Data from './data.json';
import {Grid} from './Grid';
import {Model} from './interfaces';

export class City {
    canvas: HTMLCanvasElement;
    engine: Engine;
    scene: Scene;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.engine = new Engine(canvas, true);

        this.scene = this.createScene();

        window.addEventListener('resize', () => this.engine.resize());
        this.engine.runRenderLoop(() => this.scene.render());

        if (CONFIG.isDebug) {
            this.scene.debugLayer.show();
        }
    }

    createScene(): Scene {
        const scene = new Scene(this.engine);

        this.createCamera();
        this.createLight();
        this.createModels();

        return scene;
    }

    createLight() {
        new HemisphericLight('light', new Vector3(0, 1, 0), this.scene);
    }

    createCamera() {
        const camera = new ArcRotateCamera(
            'camera',
            -Math.PI / 2,
            0,
            0,
            new Vector3(0, 0, 0),
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
        this.paintGround();
        this.paintBuildings();
        this.paintRoads();

        if (CONFIG.isGrid) {
            this.paintGrid();
        }
    }

    private paintGround() {
        new Ground(this.scene).paint();
    }

    private paintBuildings() {
        Data.buildings.forEach((buildingData: Model) => {
            const building = new Building(this.scene, {
                ...buildingData,
            });

            building.paint();
        });
    }
    private paintRoads() {
        Data.roads.forEach((roadData: RoadData) => {
            const road = new Road(this.scene, {
                ...roadData,
            });

            road.paint();
        });
    }

    private paintGrid() {
        new Grid(this.scene).paint();
    }
}
