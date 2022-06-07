import {BUILDING_TYPES} from './interfaces';

/**
 * Тут храним данные о моделях
 */
export const Models = {
    [BUILDING_TYPES.LIVING]: {
        type: BUILDING_TYPES.LIVING,
        name: 'Домик',
        path: {
            folder: 'buildings',
            fileName: 'large_buildingG.glb',
        },
    },
    [BUILDING_TYPES.MARKET]: {
        type: BUILDING_TYPES.MARKET,
        name: 'Рынок',
        path: {
            folder: 'buildings',
            fileName: 'low_buildingF.glb',
        },
    },
};
