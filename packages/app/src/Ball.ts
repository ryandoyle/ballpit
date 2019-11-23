import {Entity} from "./Entity";
import {Bodies, Body} from "matter-js";

export class Ball implements Entity {


    private body: Matter.Body;

    constructor(x: number, y: number, radius: number) {
        this.body = Bodies.circle(x, y, radius, {restitution: 0.7});
    }

    push() {
        Body.applyForce(this.body, this.body.position, {x: -0.01, y: 0});
    }

    draw(canvas: CanvasRenderingContext2D) {
        const {x, y} = this.body.position;
        canvas.beginPath();
        canvas.arc(x, y, this.body.circleRadius, 0, Math.PI * 2);
        canvas.strokeStyle = "#ff0000";
        canvas.stroke();
    }

    getPhysicsBodies(): Array<Body> {
        return [this.body];
    }

    update() {
    }

}