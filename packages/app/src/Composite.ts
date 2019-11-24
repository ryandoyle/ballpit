import {Entity} from "./Entity";

export interface Composite {
    addEntity(entity: Entity);

    removeEntity(entity: Entity);
}