module.exports = (app) => {
  const io = require("socket.io")(app, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    socket.on("receive_message", (data) => {
      console.log(data);
      socket.broadcast.emit("send_message", data);
    });
    socket.on("join_room", (data) => {
      console.log(data);
      socket.join(data);
    });
    socket.on("send_message", (data) => {
      console.log(data);
      // socket.broadcast.emit("receive_message", data); // 1 대 다수
      socket.to(data.room).emit("send_message", data); // 방 하나만
    });
  });
};
/**
 * socket.on('이벤트 명', Callback Function) : 해당 이벤트를 받고 콜백함수를 실행합니다.
socket.emit('이벤트 명', Data) : 이벤트 명을 지정하고 데이터를 보냅니다.
그리고, Custom Event 명이 아닌 기본으로 존재하는 Event 명의 의미를 알려드리겠습니다.

connection : Client 와 연결되었을 때 발생
disconnection : Client 와 연결해제되었을 때 발생
 */
