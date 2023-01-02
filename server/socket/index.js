module.exports = (app) => {
  const io = require("socket.io")(app, {
    cors: { origin: "*" },
  });
  io.on("connection", (socket) => {
    console.log("SOCKETIO connection EVENT: ", socket.id, " client connected");
    const rommsocket = socket.handshake.query.roomId;
    socket.join(rommsocket);

    socket.on("join room", (item) => {
      socket.to(rommsocket).emit("chatmsg", item);
    });
    socket.on("chatmsg", (item) => {
      // console.log(item);
      socket.to(rommsocket).emit("chatmsg", item);
    });

    socket.on("disconnect", () => console.log("user disconnect", socket.id));
  });
};
