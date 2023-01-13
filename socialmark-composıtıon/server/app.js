const socketio = require("socket.io");
const express = require("express");
const http = require("http");
const app = express();

const PORT = process.env.PORT || 2018;

const server = http.createServer(app);

const io = socketio(server, {
  // socket io icinde cors defaul var
  cors: {
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"]
  }
});

server.listen(PORT, () => {
  console.log(`Server ${PORT} portunda baslatildi...`);
  io.on("connection", socket => {
    console.log("server is started");
    console.log(socket.id);
    //! Karşılama Mesajı Gönder...
    // io.in(roomID).emit()
    socket.emit("WELCOME_MESSAGE", `Oooooo ${socket.id} kardeşim ojgeldin be yaa...`);
    socket.on("NEW_BOOKMARK_EVENT", bookmark => {
      console.log("bookmark :>> ", bookmark);
      // io.emit("NEW_BOOKMARK_ADDED", bookmark);
      //! Gonderen hariç herkese bookmark bilgisini gonder..
      socket.broadcast.emit("NEW_BOOKMARK_ADDED", bookmark);
    });
  });
});
