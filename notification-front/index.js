const connect = (usertoken) => {
  // console.log(document.getElementById("user").value);
  const socketUrl = "http://localhost:9001";
  socket = io(socketUrl, {
    reconnection: false,
    auth: {
      token: usertoken,
    },
    transportOption: {
      pooling: {},
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
const login = async () => {
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const url = "http://localhost:9001/api/users/login";
  var body = JSON.stringify({ email, password });
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };
  const response = await axios.post(url, body, config);
  console.log(response);
  if (response.data.token) {
    const userData = response.data.id;
    connect(userData);
    document.getElementById(
      "first"
    ).innerHTML = `User is loggined successfully with token ${userData}`;
  }
};
