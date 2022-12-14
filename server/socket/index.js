// const app = require("express")();
// const server = require("http").Server(app);
// const io = require("socket.io")(server, {
//   cors: {
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST"],
//   },
// });

// module.exports = () => {
//   server.listen(3005, () => {
//     console.log(`소켓연동완료`);
//   });

//   io.on("connection", (socket) => {
//     //connection
//     console.log("id", socket.id);

//     socket.on("connected", (cookie) => {
//       socket.emit("entrance-message", `Say hello! to ${user_id.id}`);
//     });
//     socket.on("disconnect", () => {
//       console.log("UserDisconnected");
//     });
//     socket.on("chat-message", (msg) => {
//       console.log("message:", msg);
//     });
//   });
// };
