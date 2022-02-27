// const { Server, Socket } = require("socket.io");
let sock;
const sends = ({ dataValues }) => {
  // console.log("sends called");
  // console.log(data);
  sock.emit("neworder", { who: dataValues });
};
const socketLogic = (io) => {
  //initializing socket io basic configuration

  io.use((socket, next) => {
    sock = socket;
    const username = socket.handshake.headers["username"];
    console.log(`${username}'User Is Connecting'`);
    next();
  });
  io.on("connection", (socket) => {
    socket.emit("jodiyo", { data: "hello user" });
    console.log("user is connected");
    socket.on("testuser", (data) => {
      console.log(data);
    });
    socket.on("disconnect", () => {
      console.log("hello");
      console.log("disconnected");
    });
    socket.on("pong", (data) => {
      console.log(data);
    });
  });
};
const funcs = {
  initSocket: socketLogic,
  send: sends,
};
module.exports = funcs;
