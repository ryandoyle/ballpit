import {Entity} from "./Entity";
import {Composite} from "./Composite";
import {Alignment} from "./EventBlock";

export class EventBlockElement implements Entity {
    get height(): number {
        return this._height;
    }
    private _name: string;
    private width: number;
    private alignment: Alignment;
    private _height: number;
    private textSize: number;
    yPosition: number;
    private xPosition: number;


    constructor(name: string, alignment: Alignment, textSize: number, xPosition: number, width: number) {
        this._name = name;
        this.alignment = alignment;
        this.textSize = textSize;
        this.xPosition = xPosition;
        this.width = width;
        this._height = textSize + (textSize / 3);
    }

    get name(): string {
        return this._name;
    }

    addSelfTo(world: Matter.World) {
    }

    draw(canvas: CanvasRenderingContext2D) {
        canvas.beginPath();
        canvas.rect(this.xPosition, this.yPosition, this.width, this._height);
        canvas.fillStyle = "green";
        canvas.fill();
        // Text
        canvas.fillStyle = "black";
        canvas.textAlign = this.alignment;
        canvas.font = `${this.textSize}px monospace`;
        if (this.alignment === "right") {
            canvas.fillText(this.name, this.xPosition + this.width, this.yPosition + this.textSize);
        } else {
            canvas.fillText(this.name, this.xPosition, this.yPosition + this.textSize);
        }

    }

    removeSelfFrom(world: Matter.World) {
    }

    update(parent: Composite, bounds: Matter.Bounds) {
    }

    emitEvent() {
        console.log(`Emitting event ${this.name}`)
    }
}