import {Entity} from "./Entity";
import {Composite} from "./Composite";
import {Bounds, Vector, World} from "matter-js";
import {EventBlockElement} from "./EventBlockElement";
import {BallScene} from "./BallScene";

export type Alignment = "left" | "right";

export class EventBlock implements Entity, Composite {
    addEntity(entity: Entity) {
        throw new Error("Method not implemented.");
    }
    removeEntity(entity: Entity) {
        throw new Error("Method not implemented.");
    }

    private name: string;
    private position: Vector;
    private width: number;
    private alignment: Alignment;
    private height: number;
    private textSize: number;
    private elements: Array<EventBlockElement> = new Array<EventBlockElement>();
    private ballScene: BallScene;

    constructor(name: string, width: number, position: Vector, alignment: Alignment, textSize: number = 12, ballScene: BallScene) {
        this.position = position;
        this.name = name;
        this.width = width;
        this.alignment = alignment;
        this.textSize = textSize;
        this.ballScene = ballScene;
        this.height = textSize + (textSize/3); // Add extra depth for "y,g" etc...
    }

    emitEvent(eventName: string) {
        let element: EventBlockElement = this.elements.find(e => e.name === eventName);
        if (element === undefined) {
            element = new EventBlockElement(eventName, this.alignment, this.textSize, this.position.x,
                this.width, this.ballScene, this.position.y + this.height + this.elements.length * this.textSize);
            this.elements.push(element);
        }
        element.emitEvent()
    }
    addSelfTo(world: World) {
    }

    draw(canvas: CanvasRenderingContext2D) {
        const elementHeights = this.elements.reduce((acc, e) => e.height + acc, 0);
        canvas.beginPath();
        canvas.rect(this.position.x, this.position.y, this.width, this.height + elementHeights);
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

        this.elements.forEach(e => e.draw(canvas));
    }

    removeSelfFrom(world: World) {
    }

    update(parent: Composite, bounds: Bounds) {
        this.elements.forEach((e, index) => {
            e.yPosition = this.position.y + e.height + e.height * index;
            e.update(this, bounds);
        })
    }


}