import {Entity} from "./Entity";
import {Composite} from "./Composite";
import {Bounds, Vector, World} from "matter-js";

export type Alignment = "left" | "right";

export class EventBlock implements Entity {

    private name: string;
    private position: Vector;
    private width: number;
    private alignment: Alignment;
    private height: number;
    private textSize: number;

    constructor(name: string, width: number, position: Vector, alignment: Alignment, textSize: number = 14) {
        this.position = position;
        this.name = name;
        this.width = width;
        this.alignment = alignment;
        this.textSize = textSize;
        this.height = textSize + (textSize/3); // Add extra depth for "y,g" etc...
    }

    addSelfTo(world: World) {
    }

    draw(canvas: CanvasRenderingContext2D) {
        canvas.beginPath();
        canvas.rect(this.position.x, this.position.y, this.width, this.height);
        canvas.fillStyle = "red";
        canvas.fill();
        // Text
        canvas.fillStyle = "blue";
        canvas.textAlign = this.alignment;
        canvas.font = `${this.textSize}px monospace`;
        if (this.alignment === "right") {
            canvas.fillText(this.name, this.position.x + this.width, this.position.y + this.textSize);
        } else {
            canvas.fillText(this.name, this.position.x, this.position.y + this.textSize);
        }
    }

    removeSelfFrom(world: World) {
    }

    update(parent: Composite, bounds: Bounds) {
    }


}