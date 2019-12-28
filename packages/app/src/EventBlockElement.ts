import {Entity} from "./Entity";
import {Composite} from "./Composite";
import {Alignment} from "./EventBlock";
import {BallScene} from "./BallScene";
import {Ball} from "./Ball";

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
    private ballScene: BallScene;
    private colour = "#00ff00";
    private backgroundAlpha = 0.0;


    constructor(name: string, alignment: Alignment, textSize: number, xPosition: number, width: number, ballScene: BallScene, yPosition: number) {
        this._name = name;
        this.alignment = alignment;
        this.textSize = textSize;
        this.xPosition = xPosition;
        this.width = width;
        this.ballScene = ballScene;
        this.yPosition = yPosition;
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
        canvas.fillStyle = this.colour;
        canvas.globalAlpha = this.backgroundAlpha;
        canvas.fill();
        canvas.globalAlpha = 1.0;
        // Text
        canvas.fillStyle = "white";
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
        this.backgroundAlpha -= 0.01;
        if (this.backgroundAlpha < 0.0) {
            this.backgroundAlpha = 0.0;
        }
    }

    private middleYPosition(): number {
        return this.yPosition + (this._height / 2)
    }

    private xPositionOfEmittingSide(): number {
        return this.alignment === "left" ? this.xPosition : this.xPosition + this.width;
    }

    emitEvent() {
        // Don't accumulate events if the window isn't being viewed
        if (document.visibilityState !== "visible") {
            return
        }
        const ball = new Ball(this.xPositionOfEmittingSide(), this.middleYPosition(), 8, this.colour);
        this.ballScene.addEntity(ball);
        if (this.alignment === "left") {
            ball.pushLeft();
        } else {
            ball.pushRight();
        }
        // Raise the background alpha, making the block visible when the event is emitted
        this.backgroundAlpha = 0.3;
    }
}