import {Scene, Animation, AbstractMesh} from '@babylonjs/core';
import {loadModels} from '../utils';

import {Model} from '../interfaces';

export class Car {
    options: Model;
    scene: Scene;
    car!: AbstractMesh | null;

    constructor(scene: Scene, options: Model) {
        this.scene = scene;
        this.options = options;
    }

    public async paint() {
        const {position, path, rotation, scale} = this.options;

        const model = await loadModels(path, {rotation, position, scale});

        if (model?.meshes[0]) {
            this.car = model?.meshes[0];
            this.car.receiveShadows = true;
        }
    }

    public animation() {
        if (!this.options.animation || !this.car) {
            return;
        }

        const {position} = this.options;
        const {coords: startCoords} = position;
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

        const startCoord =
            targetProperty === 'position.z' ? startCoords.z : startCoords.x;
        const endCoord =
            targetProperty === 'position.z' ? endCoords.z : endCoords.x;

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

    public getCar(): AbstractMesh | null {
        return this.car;
    }
}
