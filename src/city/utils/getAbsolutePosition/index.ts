import {GROUND} from '../../constants';
import {Coords, Size} from '../../interfaces';

/**
 * Возвращает координаты в стандартном формате
 */
export const getAbsolutePosition = (coords: Coords, size?: Size): Coords => {
    // todo учитывать размер - возможно возвращать в формате new BABYLON.Vector3
    const x = -GROUND.WIDTH / 2 + coords.x;
    const z = -GROUND.HEIGHT / 2 + coords.z;

    return {x, y: 0, z};
};
