export interface Coords {
    x: number;
    y: number;
    z: number;
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
    moveBorders?: {
        maxX: number;
        minX: number;
        maxZ: number;
        minZ: number;
    };
    camera: {
        alpha: number;
        beta: number;
        radius: number;
        panDistanceInfluence: number;
    };
}
