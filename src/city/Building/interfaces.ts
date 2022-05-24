import {Coords, Size} from '../interfaces';

export interface BuildingOptions {
    id: number;
    size: Size;
    coords: Coords;
    materials: {
        color: string;
    };
}

export interface BuildingData {
    id: number;
    size: Size;
    coords: Coords;
    materials: {
        color: string;
    };
}
