import {Scene, MeshBuilder, Mesh, Animation} from '@babylonjs/core';
import {setMaterial} from '../utils';

import {getAbsolutePosition} from '../utils/getAbsolutePosition';
import Data from '../data.json';
import {CarData, CarOptions} from './interfaces';

export class Car {
    options: CarOptions;
    scene: Scene;
    car: Mesh;

    constructor(scene: Scene, options: CarOptions) {
        this.scene = scene;
        this.options = options;
        this.car = MeshBuilder.CreateBox(options.name, {
            width: options.size.width,
            depth: options.size.depth,
            height: options.size.height,
        });
    }

    paint() {
        const {coords, materials} = this.options;

        // setAbsolutePosition(coords.x, coords.y, coords.z, this.car);
        setMaterial('carMaterial', this.car, {
            diffuseColor: materials.color,
        });
    }

    animation() {
        const {coords} = this.options;
        const {endCoords, speedTime} = this.options.animation;

        const frames = [];
        const fps = 60;

        const targetProperty = endCoords.z ? 'position.z' : 'position.x';

        const animation = new Animation(
            'carAnimation',
            targetProperty,
            fps,
            Animation.ANIMATIONTYPE_FLOAT,
            Animation.ANIMATIONLOOPMODE_CYCLE,
        );

        const valueStart = getAbsolutePosition(coords, this.options.size);
        const valueEnd = getAbsolutePosition(endCoords, this.options.size);

        const startCoord =
            targetProperty === 'position.z' ? valueStart.z : valueStart.x;
        const endCoord =
            targetProperty === 'position.z' ? valueEnd.z : valueEnd.x;

        frames.push(
            {
                frame: 0,
                value: startCoord,
            },
            {
                frame: speedTime,
                value: endCoord,
            },
        );

        animation.setKeys(frames);

        this.car.animations.push(animation);

        this.scene.beginAnimation(this.car, 0, speedTime, true);
    }
}

export const paintCar = (scene: Scene) => {
    Data.cars.forEach((carData: CarData) => {
        const car = new Car(scene, {
            size: {width: 0.3, depth: 0.5, height: 0.2},
            coords: carData.coords,
            animation: {
                endCoords: {
                    x: carData.animation.endCoords.x ?? 0,
                    y: carData.animation.endCoords.y ?? 0,
                    z: carData.animation.endCoords.z ?? 0,
                },
                speedTime: carData.animation.speedTime,
            },
            materials: {
                color: carData.color,
            },
            name: carData.name,
        });

        car.paint();
        car.animation();
    });
};
