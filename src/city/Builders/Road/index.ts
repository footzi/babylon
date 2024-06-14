import {ui} from '../../UI';
import {BUILDING_TYPES, ElementSize, EVENTS, Model2} from '../../interfaces';
import {
    ArcRotateCamera,
    Engine,
    Mesh,
    MeshBuilder,
    PointerEventTypes,
    Scene,
    Vector3,
} from '@babylonjs/core';
import {v4} from 'uuid';
import {setMaterial, setPosition, setRotation} from '../../utils';
import {getPositionMesh} from '../../utils/getPositionMesh';

export class RoadBuilder {
    scene: Scene;
    engine: Engine;
    camera: ArcRotateCamera;
    roadModel!: Model2;
    cursorItem: Mesh | null;
    roadItems: Mesh[];

    constructor(scene: Scene, engine: Engine, camera: ArcRotateCamera) {
        this.scene = scene;
        this.engine = engine;
        this.camera = camera;

        this.cursorItem = null;
        this.roadItems = [];
    }

    init() {
        ui.addEventListener<Model2>(EVENTS.START_BUILDING, (payload) => {
            if (payload.type === BUILDING_TYPES.ROAD_ITEM) {
                this.startBuilding(payload);
            }
        });

        ui.addEventListener(EVENTS.CANCEL_BUILDING, () => {
            this.cancelBuilding();
        });

        this.scene.onPointerObservable.add((pointerInfo, pickedInfo) => {
            switch (pointerInfo.type) {
                case PointerEventTypes.POINTERMOVE:
                    if (pointerInfo.pickInfo?.pickedPoint) {
                        this.move(pointerInfo.pickInfo.pickedPoint);
                    }
                    break;
                case PointerEventTypes.POINTERPICK:
                    if (pointerInfo.pickInfo?.pickedPoint) {
                        this.addRoadItem();
                    }
                    break;
            }
        });
    }

    private startBuilding(model: Model2) {
        this.roadModel = {
            ...model,
            id: v4(),
        };

        const item = this.paint();

        if (item) {
            this.cursorItem = item;
        }
    }

    public paint(): Mesh | null {
        if (!this.roadModel.meshParams) {
            return null;
        }
        const roadItem = MeshBuilder.CreatePlane(
            'roadItem_' + this.roadModel.id,
            {
                size: this.roadModel.meshParams.size,
            },
        );

        // setPosition({x, y, z}, roadItem);
        setRotation({x: 90}, roadItem);
        setMaterial('roadMaterial', roadItem, {
            diffuseColor: this.roadModel.meshParams.color,
        });

        return roadItem;
    }

    move(pickedPoint: Vector3) {
        if (this.cursorItem) {
            this.moveTo(pickedPoint);
        }
    }

    moveTo(pickedPoint: Vector3) {
        if (!this.roadModel.meshParams || !this.cursorItem) {
            return;
        }

        const size = this.roadModel.meshParams.size / 2;

        const x = Math.round(pickedPoint.x) - size;
        const z = Math.round(pickedPoint.z) - size;
        const y = 0.002;

        this.cursorItem.position = new Vector3(x, y, z);
    }

    addRoadItem() {
        if (!this.cursorItem) {
            return;
        }

        const item = this.paint();

        if (item) {
            // попробовать создавать айтем ид с новым ид
            const {x, y, z} = this.cursorItem.position;
            item.position = new Vector3(x, y, z);

            this.roadItems.push(item);

            if (true) {
                const coords = getPositionMesh(item, {
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

    cancelBuilding() {
        this.roadItems.forEach((roadItem) => {
            roadItem.dispose();
        });
        this.cursorItem?.dispose();

        this.roadItems = [];
        this.cursorItem = null;
    }
}
