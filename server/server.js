const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "../client")));

let users = {}; // Store connected users
let operations = []; // History of all strokes for undo/redo

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Assign color
  const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  users[socket.id] = { id: socket.id, color };

  io.emit("user-list", Object.values(users)); // update everyone

  // When user starts drawing
  socket.on("draw", (data) => {
    operations.push(data); // save operation
    socket.broadcast.emit("draw", data); // send to others
  });

  // Undo last stroke (for simplicity, removes last op globally)
  socket.on("undo", () => {
    operations.pop();
    io.emit("clear-canvas");
    operations.forEach((op) => io.emit("draw", op));
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("user-list", Object.values(users));
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => console.log("Server running on http://localhost:3000"));
