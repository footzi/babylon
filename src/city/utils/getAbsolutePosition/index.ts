import {CONFIG} from '../../config';
import {Coords, Size} from '../../interfaces';

/**
 * Возвращает координаты в стандартном формате
 */
export const getAbsolutePosition = (coords: Coords, size?: Size): Coords => {
    const {ground} = CONFIG;
    // todo учитывать размер - возможно возвращать в формате new BABYLON.Vector3
    const x = -ground.width / 2 + coords.x;
    const z = -ground.height / 2 + coords.z;

    return {x, y: 0, z};
};
