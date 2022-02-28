let sock;
//Function to send notification about new order
const sends = ({ dataValues }) => {
  sock.emit("neworder", { who: dataValues });
};
const socketLogic = (io) => {
  //initializing socket io basic configuration

  io.use((socket, next) => {
    sock = socket;
    socket.emit("jodiyo", { message: "jodiyo hajur" });
    next();
  });
  io.on("connection", (socket) => {
    socket.emit("jodiyo", { data: "hello user" });
    console.log("user is connected");
    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  });
};
const funcs = {
  initSocket: socketLogic,
  send: sends,
};
module.exports = funcs;
