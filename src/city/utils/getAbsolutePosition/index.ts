import {CONFIG} from '../../config';
import {Coords, Size} from '../../interfaces';

/**
 * Возвращает координаты в стандартном формате
 */
export const getAbsolutePosition = (coords: Coords, size?: Size): Coords => {
    const {ground} = CONFIG;
    const initialX = coords.x ?? 0;
    const initialZ = coords.z ?? 0;
    // todo учитывать размер - возможно возвращать в формате new BABYLON.Vector3
    const x = -ground.width / 2 + initialX;
    const z = -ground.height / 2 + initialZ;

    return {x, y: 0, z};
};
