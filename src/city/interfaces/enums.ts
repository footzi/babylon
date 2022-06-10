// export enum MODEL_TYPES {
//     BUILDING = 'BUILDING',
// }

export enum BUILDING_TYPES {
    LIVING = 'LIVING',
    MARKET = 'MARKET',
    ROAD_ITEM = 'ROAD_ITEM',
}

export enum LOCAL_STORAGE_KEYS {
    MODELS = 'MODELS',
}

export enum EVENTS {
    START_BUILDING = 'START_BUILDING',
    CHANGE_BUILDINGS_COORDS = 'CHANGE_BUILDINGS_COORDS',
    ADD_BUILDING = 'ADD_BUILDING',
    CANCEL_BUILDING = 'CANCEL_BUILDING',
    CLICK_MODEL = 'CLICK_MODEL',
    START_MOVING_MODEL = 'START_MOVING_MODEL',
    END_MOVING_MODEL = 'END_MOVING_MODEL',
    CANCEL_MOVING_MODEL = 'CANCEL_MOVING_MODEL',
    REMOVE_MODEL = 'REMOVE_MODEL',
    PAN_CANVAS = 'PAN_CANVAS',
    ZOOM_CANVAS = 'ZOOM_CANVAS',
    CLOSE_INFO_WINDOW = 'CLOSE_INFO_WINDOW',
}
