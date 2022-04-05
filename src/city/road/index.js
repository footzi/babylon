import * as BABYLON from 'babylonjs';
import {ROAD, ROAD_MARKUP} from './constants';
import {POSITION_Y} from '../constants';
import Data from '../data.json';
import {setAbsolutePosition, setPosition, setRotation} from '../utils';

export const paintRoads = () => {
    Data.roads.forEach((road) => paintRoad(road.coords));
};

const paintRoad = (coords) => {
    // const roadMeshes = [];
    const planeMaterial = new BABYLON.StandardMaterial('planeMaterial');
    planeMaterial.diffuseColor = new BABYLON.Color3.FromHexString(ROAD.COLOR);

    coords.forEach((item) => {
        const plane = BABYLON.MeshBuilder.CreatePlane('roadItem', {
            size: ROAD.SIZE,
        });

        setAbsolutePosition(item.x, POSITION_Y.ROAD, item.z, plane);

        plane.rotation.x = BABYLON.Tools.ToRadians(90);
        plane.material = planeMaterial;

        if (item.isVertical) {
            plane.rotation.y = BABYLON.Tools.ToRadians(90);
        }

        if (!item.isCrossroad) {
            paintRoadMarkup(plane);
        }

        // roadMeshes.push(plane);
    });

    // new BABYLON.Mesh.MergeMeshes(roadMeshes);
};

const paintRoadMarkup = (road) => {
    const markup = BABYLON.MeshBuilder.CreatePlane('roadMarkup', {
        width: ROAD_MARKUP.WIDTH,
        height: ROAD_MARKUP.HEIGHT,
    });

    markup.setParent(road);

    setPosition(-0.25, 0, -0.001, markup);
    setRotation(0, 0, 0, markup);

    const markupMaterial = new BABYLON.StandardMaterial('roadMarkupMaterial');
    markupMaterial.diffuseColor = new BABYLON.Color3.FromHexString(
        ROAD_MARKUP.COLOR,
    );
    markup.material = markupMaterial;

    const copiedPlane = markup.clone('roadMarkupCopied');
    copiedPlane.position.x = 0.25;
};
