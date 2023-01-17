module.exports = (app) => {
  const io = require("socket.io")(app, {
    cors: {
      origin:
        "https://web-food-community-front-1ih8d2glczugkpe.gksl2.cloudtype.app",
    },
  });
  io.on("connection", (socket) => {
    // console.log("SOCKETIO connection EVENT: ", socket.id, " client connected");
    const rommsocket = socket.handshake.query.roomId;
    const boardsocket = socket.handshake.query.boardId;
    const userAlarm = socket.handshake.query.user;
    socket.join(rommsocket);
    socket.join(userAlarm);
    socket.join(boardsocket);

    socket.on("join room", (item) => {
      socket.to(rommsocket).emit("chatmsg", item);
    });

    socket.on("chatmsg", (item) => {
      // console.log(item);

      socket.to(rommsocket).emit("chatmsg", item);
    });

    socket.on("board", (item) => {
      socket.to(boardsocket).emit("commentMsg", item);
    });
    socket.on("commentMsg", (item) => {
      socket.to(boardsocket).emit("commentMsg", item);
    });

    socket.on("disconnect", () => console.log("user disconnect", socket.id));
  });
};
