import {Bodies, Engine, World} from "matter-js";
import {Wall} from "./Wall";
import {Entity} from "./Entity";
import {BallScene} from "./BallScene";
import {Ball} from "./Ball";

const engine = Engine.create();
// const render = Render.create({
//     element: document.body,
//     engine: engine,
//     options: {
//         width: 1200,
//         height: 700,
//         wireframes: false
//
//     }
// });


const ground = Bodies.rectangle(800, 610, 810, 60, {isStatic: true});

const sse = new EventSource("/api/events");


interface EventMessage {
    cookie: string;
    eventBlock: string;
    eventName: string;
    radius: number;
}




setInterval(() => {
    // World.allBodies(engine.world).forEach((b) => {
    //     World.remove(engine.world, b);
    // })
}, 100);


World.add(engine.world, [ground]);
Engine.run(engine);
// Render.run(render);




var canvas = document.createElement('canvas');
canvas.style.border = '1px solid blue';

const ctx = canvas.getContext('2d');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
canvas.width = 1000;
canvas.height = 800;
document.body.appendChild(canvas);

const ballEngine: BallScene = new BallScene(engine, ctx, 1000, 800);
const wall: Entity = new Wall({width: 200, x: 150, y: 300, height: 500});
ballEngine.addEntity(wall);



sse.onmessage = (ev) => {
    const message = <EventMessage>JSON.parse(ev.data);

    // const ball = Bodies.circle(450, 50, 10, {
    //     render: {
    //         fillStyle: "red",
    //         strokeStyle: "blue",
    //         lineWidth: 3
    //     }
    // });

    const ball = new Ball(450, 50, 10);
    ballEngine.addEntity(ball);
    ball.push();


    // console.log(message);
};



(function render() {
    ballEngine.update();
    ballEngine.draw();
    window.requestAnimationFrame(render);
})();
