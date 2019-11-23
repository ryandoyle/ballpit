import {Engine, World} from "matter-js";
import {Entity} from "./Entity";

export class BallEngine {
    private physicsEngine: Matter.Engine;
    private canvas: CanvasRenderingContext2D;
    private entities: Set<Entity> = new Set<Entity>();
    private width: number;
    private height: number;

    constructor(physicsEngine: Engine, canvas: CanvasRenderingContext2D, width: number, height: number) {
        this.physicsEngine = physicsEngine;
        this.canvas = canvas;
        this.width = width;
        this.height = height;
    }

    addEntity(entity: Entity) {
        this.entities.add(entity);
        World.add(this.physicsEngine.world, entity.getPhysicsBodies());
    }

    update() {
        Engine.update(this.physicsEngine);
        this.entities.forEach(e => e.update());
        // TODO: Remove entities that have fallen out of scope from Set of entities and world
    }

    draw() {
        this.canvas.clearRect(0, 0, this.width, this.height);
        this.entities.forEach(e => e.draw(this.canvas));
    }
}