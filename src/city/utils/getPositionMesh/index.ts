import {Matrix, Vector3} from '@babylonjs/core';
import {CityMesh, ElementSize} from '../../interfaces';
import {GetPositionMeshOptions} from './interfaces';

export const getPositionMesh = (
    mesh: CityMesh,
    options: GetPositionMeshOptions,
): ElementSize => {
    const {camera, engine, scene} = options;
    const temp = new Vector3();

    const vertices = mesh.getBoundingInfo().boundingBox.vectorsWorld;
    const viewport = camera.viewport.toGlobal(
        engine.getRenderWidth(),
        engine.getRenderHeight(),
    );

    let minX = 1e10,
        minY = 1e10,
        maxX = -1e10,
        maxY = -1e10;

    let offsetTop = 0;
    let offsetLeft = 0;

    for (const vertex of vertices) {
        Vector3.ProjectToRef(
            vertex,
            Matrix.IdentityReadOnly,
            scene.getTransformMatrix(),
            viewport,
            temp,
        );

        if (minX > temp.x) minX = temp.x;
        if (maxX < temp.x) maxX = temp.x;
        if (minY > temp.y) minY = temp.y;
        if (maxY < temp.y) maxY = temp.y;
    }

    const canvas = engine.getRenderingCanvas();

    if (canvas) {
        const canvasZone = canvas.parentNode as HTMLElement;

        if (canvasZone) {
            offsetTop = canvasZone.offsetTop;
            offsetLeft = canvasZone.offsetLeft;
        }
    }

    return {
        top: minY + offsetTop,
        left: minX + offsetLeft,
        width: maxX - minX,
        height: maxY - minY,
    };
};
