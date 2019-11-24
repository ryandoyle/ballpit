import {Bounds, World} from "matter-js";
import {Composite} from "./Composite";

export interface Entity {
    draw(canvas: CanvasRenderingContext2D);

    update(parent: Composite, bounds: Bounds);

    removeSelfFrom(world: World);

    addSelfTo(world: World);

}
