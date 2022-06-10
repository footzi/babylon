import {BUILDING_TYPES, Model2} from './interfaces';

/**
 * Тут храним данные о моделях
 */
export const Models: Record<BUILDING_TYPES, Model2> = {
    [BUILDING_TYPES.LIVING]: {
        id: '',
        type: BUILDING_TYPES.LIVING,
        name: 'Домик',
        path: {
            folder: 'buildings',
            fileName: 'large_buildingG.glb',
        },
    },
    [BUILDING_TYPES.MARKET]: {
        id: '',
        type: BUILDING_TYPES.MARKET,
        name: 'Рынок',
        path: {
            folder: 'buildings',
            fileName: 'low_buildingF.glb',
        },
    },
    [BUILDING_TYPES.ROAD_ITEM]: {
        id: '',
        type: BUILDING_TYPES.ROAD_ITEM,
        name: 'Дорога',
        meshParams: {
            size: 1,
            color: '#808080',
        },
    },
};
