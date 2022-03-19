let me;
const token = localStorage.getItem("usertoken");
if (token === null) {
  window.location.replace("../../index.html");
}
function newOrder(orderdata) {
  console.log("from anothe js", orderdata);
  document.getElementById("orderbox").innerHTML =
    document.getElementById("orderbox").innerHTML +
    `
      <div class="direct-chat-messages">
        <div class="direct-chat-msg">
          <div class="direct-chat-infos clearfix">
            <span class="direct-chat-name float-left"
              >Orderer Name</span
            >
            <span class="direct-chat-timestamp float-right">Ordered Date </span>
          </div>
          <!-- /.direct-chat-infos -->
          <img
            class="direct-chat-img"
            src="dist/img/user1-128x128.jpg"
            alt="message user image"
          />
          <!-- /.direct-chat-img -->
          <div class="direct-chat-text">Give Me my Food ASAP</div>
          <!-- /.direct-chat-text -->
        </div>
      </div>
    </div>`;
}
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
    newOrder(data);
    // $.getscript("./orderlogic", function () {
    //   newOrder(data);
    // });
  });
  setTimeout(() => {
    console.log("after 5 sec");
    socket.emit("testuser", { messenger: "hello  server" });
  }, 5000);
};

function logout() {
  localStorage.removeItem("usertoken");
  window.location.replace("../../index.html");
}
