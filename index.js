// We are in node, so need to use require (instead of import from '')
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors"); // for use when deployed

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const PORT = process.env.PORT || 5000; /*  */

const router = require("./router");

/* Old simple server - no socket.io
const app = express();
...
app.listen(5000); */

// Initialize the socket.io server
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Middlewares
app.use(router);
app.use(cors()); // when deployed

// Callback runs on every 'connection'
io.on("connection", (socket) => {
  // receive event data from the front end socket (Chat.js)
  socket.on("join", ({ name, room }, callback) => {
    //console.log("name:", name, "room:", room);

    // Trigger after 'join' event is emitted. Callback data passed back to Chat.js
    //callback(...)

    // Try to create a new user and join room
    const { user, error } = addUser({
      id: socket.id,
      name,
      room,
    });

    // If there were errors, send them to the front end
    if (error) return callback(error);

    // Join the room
    socket.join(user.room);

    // - Admin Welcome Messages: (from back end to front end) -
    socket.emit("message", {
      user: "Admin",
      text: `Welcome ${user.name}, you have joined ${user.room}!`,
    });
    // Send message to everyone else in the room
    socket.broadcast.to(user.room).emit("message", {
      user: "Admin",
      text: `${user.name} has joined!`,
    });

    // Users in the room
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    // Callback to front end
    callback();
  });

  // - User Generated Messages: (waiting - from frontend to backend) -
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    // Callbact to frontend
    callback();
  });

  // Send message when leaving the room - or use Broadcast
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      // Update current users in room
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
      console.log(`${user.name} has left.`);
    }
  });
  /* socket.on("disconnect", () => {
    socket.broadcast
      .to(user.room)
      .emit("message", {
        user: "Admin",
        text: `${user.name} has left the room.`,
      });
  }); */
});

server.listen(PORT, () =>
  console.log(`Message server has started on port ${PORT}`)
);
