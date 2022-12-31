module.exports = (app) => {
  const io = require("socket.io")(app, {
    cors: { origin: "*" },
  });
  io.on("connection", (socket) => {
    console.log("New client connected");
    console.log(`User Connected: ${socket.id}`);

    socket.on("disconnect", () => console.log("user disconnect", socket.id));

    socket.on("good", (data) => {
      console.log(data); // 클라이언트 -> 서버
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
