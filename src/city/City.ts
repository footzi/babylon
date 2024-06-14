import '@babylonjs/loaders/glTF';
import {
    ArcRotateCamera,
    DirectionalLight,
    Engine,
    MeshBuilder,
    Scene,
    ShadowGenerator,
    Vector3,
} from '@babylonjs/core';
import '@babylonjs/core/Debug/debugLayer';
import '@babylonjs/inspector';
import {Ground} from './Ground';
import {Road, RoadData} from './Road';
import {CityCamera} from './CityCamera';
import {CONFIG} from './config';
import Data from './data.json';
import {Grid} from './Grid';
import {CityMesh, ElementSize, EVENTS, Model, Model2} from './interfaces';
import {Car} from './Car';
import {ui} from './UI';
import {store} from './Store';
import {ModelsBuilder} from './Builders/Models';
import {RoadBuilder} from './Builders/Road';

export class City {
    canvas: HTMLCanvasElement;
    engine: Engine;
    scene: Scene;
    camera: ArcRotateCamera;
    light: DirectionalLight;
    grid!: Grid;
    shadowGenerator: ShadowGenerator;
    modelsBuilder: ModelsBuilder;
    roadBuilder: RoadBuilder;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.engine = new Engine(canvas, true);

        this.scene = this.createScene();
        this.light = this.createLight();
        this.shadowGenerator = this.createShadowGenerator();

        this.camera = this.createCamera();

        window.addEventListener('resize', () => this.engine.resize());
        this.engine.runRenderLoop(() => this.scene.render());

        if (CONFIG.isDebug) {
            // Удалять из финальной сборки
            this.scene.debugLayer.show();
        }

        ui.init('ui', this.canvas);

        this.modelsBuilder = new ModelsBuilder(
            this.scene,
            this.engine,
            this.camera,
            this.shadowGenerator,
        );
        this.modelsBuilder.init();

        this.roadBuilder = new RoadBuilder(
            this.scene,
            this.engine,
            this.camera,
        );
        this.roadBuilder.init();

        ui.addEventListener(EVENTS.START_BUILDING, () => {
            this.paintGrid();
        });

        ui.addEventListener(EVENTS.ADD_BUILDING, () => {
            this.removeGrid();
        });

        ui.addEventListener(EVENTS.CANCEL_BUILDING, () => {
            this.removeGrid();
        });

        ui.addEventListener(EVENTS.START_MOVING_MODEL, () => {
            this.paintGrid();
        });

        ui.addEventListener(EVENTS.CANCEL_MOVING_MODEL, () => {
            this.removeGrid();
        });

        ui.addEventListener(EVENTS.END_MOVING_MODEL, () => {
            this.removeGrid();
        });

        this.createModels();
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
        const config = CONFIG.light;
        const {x, y, z} = config.position;

        const light = new DirectionalLight(
            'light',
            new Vector3(x, y, z),
            this.scene,
        );

        light.shadowEnabled = true;
        light.shadowMinZ = 0;
        light.shadowMaxZ = 40;
        light.intensity = config.intensity;

        return light;
    }

    createShadowGenerator() {
        const config = CONFIG.shadow;

        const shadowGenerator = new ShadowGenerator(config.mapSize, this.light);
        shadowGenerator.useBlurCloseExponentialShadowMap = true;
        shadowGenerator.darkness = config.darkness;

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
            const input = new CityCamera(this.canvas);
            camera.inputs.add(input);
        }

        return camera;
    }

    createModels() {
        this.paintGround();
        this.paintBuildings();
        // this.paintRoads();
        // this.paintCar();
        //
        // if (CONFIG.isGrid) {
        //     this.paintGrid();
        // }
    }

    private paintGround() {
        const ground = new Ground(this.scene);
        ground.paint();
    }

    private paintBuildings() {
        const models = store.getState().models;

        models.forEach(async (model) => {
            await this.modelsBuilder.paint(model);
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
        this.grid = new Grid(this.scene);
        this.grid.paint();
    }

    private removeGrid() {
        this.grid.remove();
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

    private create() {
        const box = MeshBuilder.CreateBox(
            'box',
            {
                width: 1,
                height: 1,
                depth: 1,
            },
            this.scene,
        );

        return box;
    }
}
