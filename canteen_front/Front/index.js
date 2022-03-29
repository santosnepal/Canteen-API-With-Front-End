document.getElementById("login").addEventListener("click", function (event) {
  event.preventDefault();
  login();
});
const token = localStorage.getItem("usertoken");
if (token) {
  fetch("http://localhost:9001/api/users/me", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      console.log(res);
      if (res.statusText === "Unauthorized") {
        return localStorage.removeItem("usertoken");
      }
      return res.json();
    })
    .then((data) => {
      if (data) {
        me = data.data;
        loadusermenu();
      }
    });
  function loadusermenu() {
    console.log(me);
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
      return window.location.replace("./pages/admin/dashboard.html");
    }
    if (staff) {
      return window.location.replace("./pages/staff/dashboard.html");
    }
    if (user) {
      return window.location.replace("./pages/user/dashboard.html");
    }
  }
}
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (email === "") {
    document.getElementById("emailreq").hidden = false;
    setTimeout(() => {
      document.getElementById("emailreq").hidden = true;
    }, 5000);
  }
  if (password === "") {
    document.getElementById("passwordreq").hidden = false;
    setTimeout(() => {
      document.getElementById("passwordreq").hidden = true;
    }, 5000);
  }
  if (email !== "" && password !== "") {
    fetch("http://localhost:9001/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success === false) {
          if (data.message === "Wrong Credental") {
            document.getElementById("wrongcredential").hidden = false;
            setTimeout(() => {
              document.getElementById("wrongcredential").hidden = true;
            }, 5000);
          }
        }
        if (data.status === 200) {
          console.log("here");
          // console.log(pwd);
          localStorage.setItem("usertoken", data.data.token);
          window.location.replace("../../index.html");
        }
      })
      .catch((err) => {
        document.getElementById("wrongcredential").hidden = false;
        setTimeout(() => {
          document.getElementById("wrongcredential").hidden = true;
        }, 5000);
        console.log("here", err);
      });
  }
}
