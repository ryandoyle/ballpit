// import common from "@ballpit/common";
import express from "express";
import SSE from "express-sse"
import uuid from "uuid";


const sse = new SSE();


const app = express();

app.get("/", (req, res) => {
    // This should be the dist folder when the app deployed as a whole
    console.log("/  was called");
    res.send({
        message: "hello"
    })
});


app.get('/api/events', sse.init);

app.listen(9090, () => console.log("listening"));

const appCookie = uuid.v1();



setInterval(() => {
    sse.send({cookie: appCookie})
}, 1000);
