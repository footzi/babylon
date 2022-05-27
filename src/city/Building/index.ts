import {Scene} from '@babylonjs/core';
import {loadModels} from '../utils';
import {Model} from '../interfaces';

export class Building {
    scene: Scene;
    options: Model;

    constructor(scene: Scene, options: Model) {
        this.scene = scene;
        this.options = options;
    }

    async paint() {
        const {position, path, rotation} = this.options;

        await loadModels(path, {position, rotation});
    }
}
