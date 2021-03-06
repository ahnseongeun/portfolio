import http from "http";
//import WebSocket from "ws";
import express from "express";
import SocketIO from "socket.io";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import { count } from "console";


const app = express();

console.log("server start");

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("videoHome")); 
app.get("/*", (req, res) => res.redirect("/"));


//http와 Websocket 서버 둘다 만들기
const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
    socket.on("join_room", (roomName) => {
        socket.join(roomName);
        socket.to(roomName).emit("welcome");
    });
    socket.on("offer", (offer, roomName) => {
        socket.to(roomName).emit("offer", offer);
    });
    socket.on("answer", (answer, roomName) => {
        socket.to(roomName).emit("answer", answer);
    });
});

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);