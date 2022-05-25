export interface Coords {
    x?: number;
    y?: number;
    z?: number;
}

export interface Size {
    width: number;
    height: number;
    depth: number;
}

export interface CONFIG_TYPE {
    isDebugLayer?: boolean;
    isGridCoords?: boolean;
    isMouseDrag?: boolean;
    ground: {
        width: number;
        height: number;
        color: string;
    };
    road: {
        size: number;
        color: string;
        markup: {
            width: number;
            height: number;
            color: string;
            defaultCoords: Coords;
        };
        defaultCoords: Coords;
    };
    camera: {
        alpha: number;
        beta: number;
        radius: number;
        panDistanceInfluence: number;
        borders?: {
            maxX: number;
            minX: number;
            maxZ: number;
            minZ: number;
        };
    };
}
