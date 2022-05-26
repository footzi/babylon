import {CONFIG} from '../config';
import {setMaterial, setPosition, setRotation} from '../utils';
import {Mesh, MeshBuilder, Scene} from '@babylonjs/core';
import {RoadOptions} from './interfaces';

export class Road {
    scene: Scene;
    options: RoadOptions;

    constructor(scene: Scene, options: RoadOptions) {
        this.scene = scene;
        this.options = options;
    }

    paint() {
        this.options.items.forEach((item, index) => {
            const roadItem = MeshBuilder.CreatePlane(
                'roadItem_' + this.options.id + index,
                {
                    size: CONFIG.road.size,
                },
            );

            const {coords, isCrossroad, isVertical} = item;
            const {x, z} = coords;
            const y = CONFIG.road.defaultCoords.y;

            setPosition({x, y, z}, roadItem);
            setRotation({x: 90}, roadItem);
            setMaterial('roadMaterial', roadItem, {
                diffuseColor: CONFIG.road.color,
            });

            if (isVertical) {
                setRotation({x: 90, y: 90}, roadItem);
            }

            if (!isCrossroad) {
                this.paintMarkup(roadItem);
            }
        });
    }

    private paintMarkup(roadItem: Mesh) {
        const {road} = CONFIG;

        const markup = MeshBuilder.CreatePlane('roadMarkup', {
            width: road.markup.width,
            height: road.markup.height,
        });

        markup.setParent(roadItem);

        setPosition(road.markup.defaultCoords, markup);
        setRotation({x: 0, y: 0, z: 0}, markup);
        setMaterial('roadMarkupMaterial', markup, {
            diffuseColor: road.markup.color,
        });

        const copiedPlane = markup.clone('roadMarkupCopied');
        setPosition({...road.markup.defaultCoords, x: 0.25}, copiedPlane);
    }
}

export * from './interfaces';
