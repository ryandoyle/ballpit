import {Bodies, Body} from "matter-js";
import {Entity} from "./Entity";

export interface ConstructorParams {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class Wall implements Entity {
    private physicsBody: Body;

    constructor({x, y, width, height}: ConstructorParams) {
        this.physicsBody = Bodies.rectangle(x, y, width, height, {isStatic: true});
    }

    draw(canvas: CanvasRenderingContext2D): void {
        canvas.beginPath();
        var vertices = this.physicsBody.vertices;
        canvas.moveTo(vertices[0].x, vertices[0].y);
        for (var j = 1; j < vertices.length; j += 1) {
            canvas.lineTo(vertices[j].x, vertices[j].y);
        }
        canvas.lineTo(vertices[0].x, vertices[0].y);
        // canvas.lineWidth = 1;
        // canvas.strokeStyle = '#ff0000';
        canvas.fillStyle = '#222222';
        canvas.fill();
        // canvas.stroke();
    }

    update(): void {
    }

    getPhysicsBodies(): Array<Body> {
        return [this.physicsBody];
    }

}