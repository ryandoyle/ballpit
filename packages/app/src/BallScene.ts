import {Engine} from "matter-js";
import {Entity} from "./Entity";
import {Composite} from "./Composite";

export class BallScene implements Entity, Composite {

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

    addSelfTo(world: Matter.World) {
        // Root, nothing to add to the world
    }

    removeSelfFrom(world: Matter.World) {
        // noop: can't remove the, maybe could remove the canvas? Needs to remove all children too
    }

    update() {
        Engine.update(this.physicsEngine);
        this.entities.forEach(e => e.update(this, {min: {x:0, y:0}, max: {x: this.width, y: this.height}}));
        // TODO: Remove entities that have fallen out of scope from Set of entities and world
    }

    draw() {
        this.canvas.clearRect(0, 0, this.width, this.height);
        this.entities.forEach(e => e.draw(this.canvas));
    }

    addEntity(entity: Entity) {
        this.entities.add(entity);
        entity.addSelfTo(this.physicsEngine.world);
    }

    removeEntity(entity: Entity) {
        entity.removeSelfFrom(this.physicsEngine.world);
        this.entities.delete(entity);
    }


}