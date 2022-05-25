import {Coords} from '../interfaces';

export interface RoadItem {
    coords: Coords;
    isVertical?: boolean;
    isCrossroad?: boolean;
}

export interface RoadOptions {
    id: number;
    items: RoadItem[];
}

export interface RoadData {
    id: number;
    items: RoadItem[];
}
