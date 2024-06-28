const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
const { Socket } = require("dgram");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User Connected: ", socket.id);
  console.log(io.of("/").sockets.size);

  socket.on("disconnect", () => {
    console.log("User Disconnect:", socket.id);
    console.log(io.of("/").sockets.size);
  });

  socket.on("join_room", (data) => {
    socket.join(data[1]);
    console.log(`User: ${data[0]} has joined Room:${data[1]}`);
    console.log(socket.rooms);
  });

  socket.on("leave_room", (room) => {
    socket.leave(room);
    console.log(socket.rooms);
  });
});

server.listen(8081, () => {
  console.log("Server active and listening on 8080");
});
