import '@babylonjs/loaders/glTF';
import {
    HemisphericLight,
    ArcRotateCamera,
    Engine,
    Scene,
    Vector3,
    DirectionalLight,
    ShadowGenerator,
} from '@babylonjs/core';
import '@babylonjs/core/Debug/debugLayer';
import '@babylonjs/inspector';
import {Ground} from './Ground';
import {Road, RoadData} from './Road';
import {CityCamera} from './CityCamera';
import {CONFIG} from './config';
import {Building} from './Building';
import Data from './data.json';
import {Grid} from './Grid';
import {Model} from './interfaces';
import {Car} from './Car';

export class City {
    canvas: HTMLCanvasElement;
    engine: Engine;
    scene: Scene;
    light: DirectionalLight;
    shadowGenerator: ShadowGenerator;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.engine = new Engine(canvas, true);

        this.scene = this.createScene();
        this.light = this.createLight();
        this.shadowGenerator = this.createShadowGenerator();

        this.createCamera();
        this.createModels();

        window.addEventListener('resize', () => this.engine.resize());
        this.engine.runRenderLoop(() => this.scene.render());

        if (CONFIG.isDebug) {
            // Удалять из финальной сборки
            this.scene.debugLayer.show();
        }
    }

    createScene(): Scene {
        return new Scene(this.engine);
    }

    createLight() {
        // const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
        // const light = new HemisphericLight(
        //     'light',
        //     new Vector3(0, 1, 0),
        //     this.scene,
        // );

        const light = new DirectionalLight(
            'light',
            new Vector3(-1, -2, 1),
            this.scene,
        );

        light.shadowEnabled = true;
        light.shadowMinZ = 1;
        light.shadowMaxZ = 10;

        return light;
    }

    createShadowGenerator() {
        const shadowGenerator = new ShadowGenerator(
            CONFIG.light.mapSize,
            this.light,
        );
        shadowGenerator.useBlurCloseExponentialShadowMap = true;
        shadowGenerator.darkness = 0.5;

        return shadowGenerator;
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
        this.paintCar();

        if (CONFIG.isGrid) {
            this.paintGrid();
        }
    }

    private paintGround() {
        const ground = new Ground(this.scene);
        ground.paint();
    }

    private paintBuildings() {
        Data.buildings.forEach(async (buildingData: Model) => {
            const building = new Building(this.scene, {
                ...buildingData,
            });

            await building.paint();

            const mesh = building.getBuilding();

            if (mesh) {
                this.shadowGenerator.addShadowCaster(mesh);
            }
        });
    }
    private paintRoads() {
        Data.roads.forEach((roadData: RoadData) => {
            const road = new Road(this.scene, {
                ...roadData,
            });

            road.paint();

            const roadItems = road.getRoadItems();
            roadItems.forEach((item) => {
                this.shadowGenerator.addShadowCaster(item);
            });
        });
    }

    private paintGrid() {
        new Grid(this.scene).paint();
    }

    private paintCar() {
        Data.cars.forEach(async (carData: Model) => {
            const car = new Car(this.scene, {
                ...carData,
            });

            await car.paint();
            car.animation();

            const mesh = car.getCar();

            if (mesh) {
                this.shadowGenerator.addShadowCaster(mesh);
            }
        });
    }
}
