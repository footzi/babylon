import {ui} from '../../UI';
import {BUILDING_TYPES, EVENTS, Model2} from '../../interfaces';
import {
    Mesh,
    MeshBuilder,
    PointerEventTypes,
    Scene,
    Vector3,
} from '@babylonjs/core';
import {v4} from 'uuid';
import {setMaterial, setPosition, setRotation} from '../../utils';

export class RoadBuilder {
    scene: Scene;
    roadModel!: Model2;
    roadItem!: Mesh;
    roadItems: Mesh[];

    constructor(scene: Scene) {
        this.scene = scene;
        this.roadItems = [];
    }

    init() {
        ui.addEventListener<Model2>(EVENTS.START_BUILDING, (payload) => {
            if (payload.type === BUILDING_TYPES.ROAD_ITEM) {
                this.startBuilding(payload);
            }
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
            this.roadItem = item;
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
        if (this.roadItem) {
            this.moveTo(pickedPoint);
        }
    }

    moveTo(pickedPoint: Vector3) {
        if (!this.roadModel.meshParams) {
            return;
        }

        const size = this.roadModel.meshParams.size / 2;

        const x = Math.round(pickedPoint.x) - size;
        const z = Math.round(pickedPoint.z) - size;
        const y = 0.002;

        this.roadItem.position = new Vector3(x, y, z);
    }

    addRoadItem() {
        this.roadItems.push(this.roadItem);

        const item = this.paint();

        if (item) {
            this.roadItem = item;
        }
    }
}
