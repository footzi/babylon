import '@babylonjs/loaders/glTF';
import {
    ArcRotateCamera,
    DirectionalLight,
    Engine,
    Scene,
    ShadowGenerator,
    Vector3,
    MeshBuilder,
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
import {BUILDING_TYPES, CityMesh, Model} from './interfaces';
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

        this.testClick();

        window.addEventListener('resize', () => this.engine.resize());
        this.engine.runRenderLoop(() => this.scene.render());

        if (CONFIG.isDebug) {
            // Удалять из финальной сборки
            this.scene.debugLayer.show();
        }

        // new UI().init('ui');
        //
        // console.log(store.getState(), 'state from city');
        //
        // store.subscribe(() => {
        //     console.log(store.getState(), 'state from city');
        // });
        //
        // setTimeout(() => {
        //     store.dispatch(todoAdded(1000));
        // }, 1000);
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

    private testClick() {
        let movedMesh: CityMesh | null = null;

        const box = MeshBuilder.CreateBox(
            'box',
            {
                // параметры для BOX
                width: 1,
                height: 1,
                depth: 1,
            },
            this.scene,
        );

        box.position = new Vector3(9, 0, 5);

        this.scene.onPointerDown = function (evt, pickResult) {
            const pickedMesh = pickResult.pickedMesh as CityMesh;

            if (pickedMesh.city?.type === BUILDING_TYPES.LIVING) {
                if (!movedMesh) {
                    movedMesh = pickedMesh;
                } else {
                    movedMesh = null;
                }
            }
        };

        this.scene.onPointerMove = (evt, pickInfo) => {
            if (movedMesh && pickInfo.pickedPoint) {
                movedMesh.position = pickInfo.pickedPoint;
            }
        };
    }
}
