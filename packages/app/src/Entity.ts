import {Body} from "matter-js";

export interface Entity {
    draw(canvas: CanvasRenderingContext2D);

    update();

    getPhysicsBodies(): Array<Body>;
}
