import {
    ArcRotateCamera,
    Engine,
    PickingInfo,
    Scene,
    Vector3,
} from '@babylonjs/core';
import {CityMesh, ElementSize, EVENTS, Model2} from '../../interfaces';
import {Building} from '../../Building';
import {getPositionMesh} from '../../utils/getPositionMesh';
import {ui} from '../../UI';
import {addModel, store} from '../../Store';
import {createSlice} from '@reduxjs/toolkit';

export class ModelsBuilder {
    scene: Scene;
    buildingModel: Model2 | null;
    building: Building | null;
    engine: Engine;
    camera: ArcRotateCamera;
    isMoving: boolean;

    constructor(scene: Scene, engine: Engine, camera: ArcRotateCamera) {
        this.scene = scene;
        this.engine = engine;
        this.camera = camera;

        this.buildingModel = null;
        this.building = null;
        this.isMoving = false;
    }

    public init() {
        ui.addEventListener<Model2>(EVENTS.START_BUILDING, (payload) => {
            this.start(payload);
        });

        ui.addEventListener(EVENTS.ADD_BUILDING, () => {
            this.end();
        });

        ui.addEventListener(EVENTS.CANCEL_BUILDING, () => {
            this.cancel();
        });

        this.scene.onPointerMove = (event, pickedInfo) =>
            this.moving(pickedInfo);

        this.scene.onPointerDown = () => this.stopMoving();
    }

    public paint(model: Model2) {
        this.building = new Building(this.scene, model);
        this.building.paint();
    }

    private moving(pickInfo: PickingInfo) {
        if (this.building && pickInfo.pickedPoint && this.isMoving) {
            this.building.setPosition(pickInfo.pickedPoint);

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
                    this.buildingModel.position =
                        this.building.getPositionCoords();
                }
            }
        }
    }

    private stopMoving() {
        this.isMoving = false;
    }

    private start(model: Model2) {
        this.buildingModel = model;
        this.isMoving = true;

        this.paint(model);
    }

    private end() {
        store.dispatch(addModel(this.buildingModel));
        this.building = null;
        this.buildingModel = null;
    }

    private cancel() {
        this.building?.remove();
        this.building = null;
        this.buildingModel = null;
    }
}
