import {
    ArcRotateCamera,
    Engine,
    PickingInfo,
    Scene,
    Vector3,
} from '@babylonjs/core';
import {v4} from 'uuid';
import {CityMesh, ElementSize, EVENTS, Model2} from '../../interfaces';
import {Building} from '../../Building';
import {getPositionMesh} from '../../utils/getPositionMesh';
import {ui} from '../../UI';
import {addModel, changeModel, removeModel, store} from '../../Store';

export class ModelsBuilder {
    scene: Scene;
    buildingModel: Model2 | null;
    building: Building | null;
    buildings: Building[];
    engine: Engine;
    camera: ArcRotateCamera;
    // Строительство
    isBuilding: boolean;
    // Перемещение
    isMoving: boolean;
    // Начальные координаты перемешения
    startedMovingCoords: Vector3 | null;

    constructor(scene: Scene, engine: Engine, camera: ArcRotateCamera) {
        this.scene = scene;
        this.engine = engine;
        this.camera = camera;

        this.buildingModel = null;
        this.building = null;
        this.buildings = [];
        this.isBuilding = false;
        this.isMoving = false;
        this.startedMovingCoords = null;
    }

    public init() {
        ui.addEventListener<Model2>(EVENTS.START_BUILDING, (payload) => {
            this.startBuilding(payload);
        });

        ui.addEventListener(EVENTS.ADD_BUILDING, () => {
            this.endBuilding();
        });

        ui.addEventListener(EVENTS.CANCEL_BUILDING, () => {
            this.cancelBuilding();
        });

        ui.addEventListener<Model2>(EVENTS.START_MOVING_MODEL, (model) =>
            this.startMoving(model),
        );

        ui.addEventListener(EVENTS.END_MOVING_MODEL, () => {
            this.endMoving();
        });

        ui.addEventListener(EVENTS.CANCEL_MOVING_MODEL, () => {
            this.cancelMoving();
        });

        ui.addEventListener<Model2>(EVENTS.REMOVE_MODEL, (model) =>
            this.remove(model),
        );

        ui.addEventListener<Model2>(EVENTS.PAN_CANVAS, () =>
            this.recalcPosition(),
        );

        ui.addEventListener<Model2>(EVENTS.ZOOM_CANVAS, () =>
            this.recalcPosition(),
        );

        this.scene.onPointerMove = (event, pickedInfo) => {
            if (pickedInfo.pickedPoint) {
                this.moving(pickedInfo.pickedPoint);
            }
        };

        this.scene.onPointerDown = (event, pickedInfo) => {
            this.showInfo(pickedInfo);
            this.stopMoving();
        };
    }

    public paint(model: Model2): Building {
        const building = new Building(this.scene, model);
        building.paint();

        this.buildings.push(building);

        return building;
    }

    private moving(pickedPoint: Vector3) {
        if (this.isBuilding || this.isMoving) {
            this.moveTo(pickedPoint);
        }
    }

    private moveTo(pickedPoint: Vector3) {
        if (!this.building) {
            return;
        }
        this.building.setPosition(pickedPoint);

        const mesh = this.building.getMesh();

        if (mesh) {
            const coords = getPositionMesh(mesh, {
                scene: this.scene,
                camera: this.camera,
                engine: this.engine,
            });

            ui.dispatchEvent<ElementSize>(
                EVENTS.CHANGE_BUILDINGS_COORDS,
                coords,
            );

            if (this.buildingModel) {
                this.buildingModel.position = this.building.getPositionCoords();
            }
        }
    }

    private startMoving(model: Model2) {
        this.isMoving = true;
        this.buildingModel = model;

        const building = this.buildings.find(
            (building) => building.id === model.id,
        );

        if (building) {
            this.building = building;
            this.startedMovingCoords = building.getCoords();
        }
    }

    private stopMoving() {
        this.isMoving = false;
        this.isBuilding = false;
    }

    private startBuilding(model: Model2) {
        this.isBuilding = true;
        this.buildingModel = {
            ...model,
            id: v4(),
        };
        this.building = this.paint(this.buildingModel);
    }

    private endBuilding() {
        if (this.buildingModel) {
            store.dispatch(addModel(this.buildingModel));
        }
        this.building = null;
        this.buildingModel = null;
        this.isBuilding = false;
    }

    private endMoving() {
        if (this.buildingModel) {
            store.dispatch(changeModel(this.buildingModel));
        }
        this.building = null;
        this.buildingModel = null;
        this.isMoving = false;
    }

    private cancelBuilding() {
        this.building?.remove();

        this.buildings = this.buildings.filter(
            (building) => building.id !== this.buildingModel?.id,
        );
        this.building = null;
        this.buildingModel = null;
        this.isBuilding = false;
    }

    private cancelMoving() {
        if (this.startedMovingCoords) {
            this.moveTo(this.startedMovingCoords);
        }

        this.building = null;
        this.buildingModel = null;
        this.isMoving = false;
    }

    private showInfo(pickInfo: PickingInfo) {
        if (this.isBuilding || this.isMoving) {
            return;
        }

        const mesh = pickInfo.pickedMesh as CityMesh;
        const id = mesh.city?.id;
        const currentBuilding = this.buildings.find(
            (building) => building.id === id,
        );

        if (currentBuilding) {
            this.building = currentBuilding;
        }

        if (id) {
            const model = store
                .getState()
                .models.find((model) => model.id === id);

            const coords = getPositionMesh(mesh, {
                scene: this.scene,
                camera: this.camera,
                engine: this.engine,
            });

            if (model) {
                ui.dispatchEvent(EVENTS.CLICK_MODEL, {
                    coords,
                    model,
                });
            }
        }
    }

    private remove(model: Model2) {
        const building = this.buildings.find(
            (building) => building.id === model.id,
        );

        building?.remove();

        this.buildings = this.buildings.filter(
            (building) => building.id !== model?.id,
        );

        store.dispatch(removeModel(model.id));
    }

    private recalcPosition() {
        if (!this.building) {
            return;
        }

        const mesh = this.building.getMesh();

        if (mesh) {
            const coords = getPositionMesh(mesh, {
                scene: this.scene,
                camera: this.camera,
                engine: this.engine,
            });

            ui.dispatchEvent<ElementSize>(
                EVENTS.CHANGE_BUILDINGS_COORDS,
                coords,
            );
        }
    }
}
