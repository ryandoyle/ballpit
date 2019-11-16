import {Engine, Render, Bodies, World, Body, Events, Bounds} from "matter-js";
// import {} from ""

console.log("Hello from appz");





const engine = Engine.create();
const render = Render.create({
    element: document.body,
    engine: engine
});


const boxA = Bodies.rectangle(400, 200, 80, 80);
const boxB = Bodies.circle(450, 50, 80, {
    render: {
        fillStyle: "red",
        strokeStyle: "blue",
        lineWidth: 3
    }

});
const ground = Bodies.rectangle(800, 610, 810, 60, {isStatic: true});

const sse = new EventSource("/api/events");


interface EventMessage {
    cookie: string;
    eventBlock: string;
    eventName: string;
    radius: number;
}


sse.onmessage = (ev) => {
    const message = <EventMessage>JSON.parse(ev.data);

    const ball = Bodies.circle(450, 50, 10, {

        render: {
            fillStyle: "red",
            strokeStyle: "blue",
            lineWidth: 3
        }
    });
    World.add(engine.world, ball);
    Body.applyForce(ball, ball.position, {x: -0.01, y: 0});

    console.log(message.cookie);
};


setInterval(() => {
    // World.allBodies(engine.world).forEach((b) => {
    //     World.remove(engine.world, b);
    // })
}, 100);


World.add(engine.world, [boxA, boxB, ground]);
Engine.run(engine);
Render.run(render);



