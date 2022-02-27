const connect = () => {
  console.log(document.getElementById("user").value);
  const who = document.getElementById("user").value;
  const socketUrl = "http://localhost:9001";
  socket = io(socketUrl, {
    reconnection: true,
    transportOption: {
      pooling: {
        extraHeaders: {
          username: who,
        },
      },
    },
    secure: true,
  });
  socket.on("jodiyo", function (data) {
    console.log(data);
  });
  socket.on("neworder", (data) => {
    console.log(data);
  });
  setTimeout(() => {
    console.log("after 5 sec");
    socket.emit("testuser", { messenger: "hello  server" });
  }, 5000);
};
