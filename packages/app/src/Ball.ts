import {Entity} from "./Entity";
import {Bodies, Body, Bounds, World} from "matter-js";
import {Composite} from "./Composite";

export class Ball implements Entity {


    private body: Matter.Body;

    constructor(x: number, y: number, radius: number) {
        this.body = Bodies.circle(x, y, radius, {restitution: 0.7});
    }

    removeSelfFrom(world: World) {
        World.remove(world, this.body);
    }

    addSelfTo(world: World) {
        World.add(world, this.body);
    }

    pushLeft() {
        Body.applyForce(this.body, this.body.position, {x: -0.005, y: 0});
    }
    pushRight() {
        Body.applyForce(this.body, this.body.position, {x: 0.005, y: 0});
    }

    draw(canvas: CanvasRenderingContext2D) {
        const {x, y} = this.body.position;
        canvas.beginPath();
        canvas.arc(x, y, this.body.circleRadius, 0, Math.PI * 2);
        canvas.strokeStyle = "#ff0000";
        canvas.stroke();
    }

    update(parent: Composite, bounds: Bounds) {
        if (!Bounds.overlaps(this.body.bounds, bounds)) {
            parent.removeEntity(this);
        }
    }

}