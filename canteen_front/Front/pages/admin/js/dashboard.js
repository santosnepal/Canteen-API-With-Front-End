let me;
let neworder;
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("toaster").addEventListener("click", () => {
    const uorder = document.getElementById("ufordernumber");
    const dboard = document.getElementById("orderbox");
    if (uorder && dboard) {
      const what = +uorder.innerHTML;
      uorder.innerHTML = what + 1;
      newOrder(neworder);
    }
    $(document).Toasts("create", {
      class: "bg-success",
      title: "<h4>New Order Received</h4>",
      body: `<h5>From:${neworder.user.name}
      <br>
      Item:${neworder.item.name}
      <br>
      Quantity:${neworder.quantity}</h5>`,
    });
  });
  const token = localStorage.getItem("usertoken");
  if (token === null) {
    document.getElementById("launchmodel").click();
    return setTimeout(() => {
      window.location.replace("../../index.html");
    }, 2000);
  }
  if (token !== null) {
    fetch("http://localhost:9001/api/users/me", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.statusText === "Unauthorized") {
          localStorage.removeItem("usertoken");
          document.getElementById("launchmodel").click();
          return setTimeout(() => {
            window.location.replace("../../index.html");
          }, 2000);
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          me = data.data;
          let admin;
          let staff;
          let user;
          me.roles.map((role) => {
            if (role.name === "admin") {
              admin = true;
            }
            if (role.name === "staff") {
              staff = true;
            }
            if (role.name === "user") {
              user = true;
            }
          });
          if (admin) {
            // console.log("button clicked");
            connect();
            document.getElementById(
              "userimages"
            ).src = `http://localhost:9001/${me.profile_pic}`;
            return (document.getElementById("username").innerHTML = me.name);
          }
          if (staff) {
            localStorage.removeItem("usertoken");
            document.getElementById("launchmodel").click();
            return setTimeout(() => {
              window.location.replace("../../index.html");
            }, 2000);
          }
          if (user) {
            localStorage.removeItem("usertoken");
            document.getElementById("launchmodel").click();
            return setTimeout(() => {
              window.location.replace("../../index.html");
            }, 2000);
          }
        }
      });
  }
});
function newOrder(orderdata) {
  console.log("from anothe js", orderdata);
  document.getElementById("orderbox").innerHTML =
    document.getElementById("orderbox").innerHTML +
    `
      <div class="direct-chat-messages">
        <div class="direct-chat-msg">
          <div class="direct-chat-infos clearfix">
            <span class="direct-chat-name float-left"
              >Orderer: ${orderdata.user.name}</span
            >
            <span class="direct-chat-timestamp float-right"> when: ${new Date()}</span>
          </div>
          <!-- /.direct-chat-infos -->
          
          <div class="direct-chat-text">Item Name: ${
            orderdata.item.name
          }<br> Quantity: ${orderdata.quantity}</div>
          <!-- /.direct-chat-text -->
        </div>
      </div>
    </div>`;
}
const connect = (usertoken) => {
  // console.log(document.getElementById("user").value);
  const socketUrl = "http://localhost:9001";
  var socket = io(socketUrl, {
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
    console.log("socket Conected");
  });
  socket.on("neworder", (data) => {
    neworder = data.who;
    document.getElementById("toaster").click();
    console.log(data);
  });
};

function logout() {
  localStorage.removeItem("usertoken");
  window.location.replace("../../index.html");
}
