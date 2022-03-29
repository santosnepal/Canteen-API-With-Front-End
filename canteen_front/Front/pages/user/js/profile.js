let me;
let neworder;
let token;
function loader() {
  token = localStorage.getItem("usertoken");
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
            localStorage.removeItem("usertoken");
            document.getElementById("launchmodel").click();
            return setTimeout(() => {
              window.location.replace("../../index.html");
            }, 2000);
          }
          if (staff) {
            localStorage.removeItem("usertoken");
            document.getElementById("launchmodel").click();
            return setTimeout(() => {
              window.location.replace("../../index.html");
            }, 2000);
          }
          if (user) {
            document.getElementById(
              "userimages"
            ).src = `http://localhost:9001/${me.profile_pic}`;
            document.getElementById(
              "userimages1"
            ).src = `http://localhost:9001/${me.profile_pic}`;
            document.getElementById("useremail").innerHTML = me.email;
            document.getElementById("usernames").innerHTML = me.name;
            document.getElementById("changename").placeholder = me.name;
            document.getElementById("changeemail").value = me.email;
            document.getElementById("changephone").value = me.phone_no;
            me.roles.map((role) => {
              document.getElementById("myroles").innerHTML =
                document.getElementById("myroles").innerHTML +
                `
              <label>${role.name}</role>,
              `;
            });
            return (document.getElementById("username").innerHTML = me.name);
          }
        }
      });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  loader();
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
  document.getElementById("userimages1").addEventListener("click", () => {
    document.getElementById("myfile").click();
  });
  document.getElementById("editprofile").addEventListener("click", () => {
    let fname;
    const name = document.getElementById("changename");
    const photo = document.getElementById("myfile");
    if (name.value === "") {
      fname = name.placeholder;
    } else if (photo.files.length !== 0 && name.value !== "") {
      const formdata = new FormData();
      formdata.append("name", name.value);
      formdata.append("image", photo.files[0]);
      fetch("http://localhost:9001/api/users/edit/me", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formdata,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          $(document).Toasts("create", {
            class: "bg-success",
            autohide: true,
            body: ` profile updated successfully`,
          });
          name.value = "";
          return loader();
        });
    } else if (photo.files.length !== 0 && name.value === "") {
      const formdata = new FormData();
      formdata.append("name", name.placeholder);
      formdata.append("image", photo.files[0]);
      fetch("http://localhost:9001/api/users/edit/me", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formdata,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          $(document).Toasts("create", {
            class: "bg-success",
            autohide: true,
            body: ` profile updated successfully`,
          });
          name.value = "";
          return loader();
        });
    } else if (photo.files.length === 0 && name.value !== "") {
      console.log(name.value);
      fetch("http://localhost:9001/api/users/edit/me", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name: name.value }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          $(document).Toasts("create", {
            class: "bg-success",
            autohide: true,
            body: ` profile updated successfully`,
          });
          name.value = "";
          return loader();
        });
    } else if (name.value === "" && photo.files.length === 0) {
      $(document).Toasts("create", {
        class: "bg-warning",
        autohide: true,
        body: ` Please modify at least a field`,
      });
    }
  });
  document.getElementById("changepassword").addEventListener("click", () => {
    const oldpassword = document.getElementById("old").value;
    const newpassword = document.getElementById("new").value;
    const repassword = document.getElementById("re").value;
    if (oldpassword === "" || newpassword === "" || repassword === "") {
      document.getElementById("oldp").style.color = "red";
      document.getElementById("oldp").innerHTML =
        "Please Fill all Pasword Field";
      return setTimeout(() => {
        document.getElementById("oldp").style.color = "";
        document.getElementById("oldp").innerHTML = "Old Password";
      }, 2000);
    }
    if (newpassword !== repassword) {
      document.getElementById("newp").style.color = "red";
      document.getElementById("newp").innerHTML =
        "New Password and repasword donot match";
      return setTimeout(() => {
        document.getElementById("newp").style.color = "";
        document.getElementById("newp").innerHTML = "New Password";
      }, 2000);
    }

    fetch("http://localhost:9001/api/users/changepassword/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        password: newpassword,
        old_password: oldpassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 404) {
          document.getElementById("oldp").style.color = "red";
          document.getElementById("oldp").innerHTML =
            "Old Password donot match";
          return setTimeout(() => {
            document.getElementById("oldp").style.color = "";
            document.getElementById("oldp").innerHTML = "Old Password";
          }, 2000);
        }
        $(document).Toasts("create", {
          class: "bg-success",
          body: ` Password Changed successfully Redirecting to login`,
        });
        localStorage.removeItem("usertoken");
        return setTimeout(() => {
          window.location.replace("../../index.html");
        }, 2000);
      });
  });
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
