import * as BABYLON from 'babylonjs';
import {GROUND} from '../constants';
import {ROAD, ROAD_MARKUP} from './constants';
import Data from '../data.json';

export const paintRoads = () => {
    Data.roads.forEach((road) => paintRoad(road.coords));
};

const paintRoad = (coords) => {
    const planeMaterial = new BABYLON.StandardMaterial('planeMaterial');
    planeMaterial.diffuseColor = new BABYLON.Color3.FromHexString(ROAD.COLOR);

    const startX = (-GROUND.WIDTH + ROAD.SIZE) / 2;
    const startZ = (-GROUND.HEIGHT + ROAD.SIZE) / 2;

    coords.forEach((item) => {
        const plane = BABYLON.MeshBuilder.CreatePlane('plane', {
            size: ROAD.SIZE,
        });

        const x = startX + item.x;
        const y = 0.01;
        const z = startZ + item.z;

        plane.position = new BABYLON.Vector3(x, y, z);
        plane.rotation.x = BABYLON.Tools.ToRadians(90);
        plane.material = planeMaterial;

        if (item.isVertical) {
            plane.rotation.y = BABYLON.Tools.ToRadians(90);
        }

        if (!item.isCrossroad) {
            paintRoadMarkup(plane);
        }
    });
};

const paintRoadMarkup = (road) => {
    const markup = BABYLON.MeshBuilder.CreatePlane('roadMarkup', {
        width: ROAD_MARKUP.WIDTH,
        height: ROAD_MARKUP.HEIGHT,
    });

    markup.setParent(road);

    markup.position = new BABYLON.Vector3(-0.25, 0, -0.001);
    markup.rotation = new BABYLON.Vector3(0, 0, 0);

    const markupMaterial = new BABYLON.StandardMaterial('roadMarkupMaterial');
    markupMaterial.diffuseColor = new BABYLON.Color3.FromHexString(
        ROAD_MARKUP.COLOR,
    );
    markup.material = markupMaterial;

    const copiedPlane1 = markup.clone();
    copiedPlane1.position.x = 0.25;
};
