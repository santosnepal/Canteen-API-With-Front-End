const token = localStorage.getItem("usertoken");
if (token !== null) {
  window.location.replace("../index.html");
}
function checkinput(where) {
  const shower = document.getElementById("checkinput");
  shower.innerHTML = where;
  shower.hidden = false;
  setTimeout(() => {
    shower.hidden = true;
  }, 5000);
}
function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
function register() {
  const email = document.getElementById("email").value;
  const name = document.getElementById("name").value;
  const phone_no = document.getElementById("phone").value;
  const password = document.getElementById("password").value;
  const repassword = document.getElementById("repassword").value;
  const profile_pic = document.getElementById("profile_pic").files;
  if (name === "") {
    return checkinput("Name Should Not Empty");
  }
  if (email === "") {
    return checkinput("Email Should Not Be Empty");
  }
  if (!validateEmail(email)) {
    return checkinput("Email is Not valid");
  }
  if (phone_no === "") {
    return checkinput("Phone No Should not be empty");
  }
  if (profile_pic.length === 0) {
    return checkinput("profile Picture Cannot Be empty");
  }
  if (password === "") {
    return checkinput("Password Cannot Be Empty");
  }
  if (repassword === "") {
    return checkinput("Re password Cannot Be empty");
  }
  if (password !== repassword) {
    return checkinput("Password and Re Password Do Not Match");
  }
  finalregister(name, email, phone_no, password, profile_pic);
}
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("register")
    .addEventListener("click", function (event) {
      event.preventDefault();
      register();
    });
});
function finalregister(name, email, phone_no, password, profile_pic) {
  const formdata = new FormData();
  formdata.append("email", email);
  formdata.append("password", password);
  formdata.append("phone_no", phone_no);
  formdata.append("name", name);
  formdata.append("image", profile_pic[0]);
  fetch("http://localhost:9001/api/users", {
    method: "POST",
    body: formdata,
  })
    .then((res) => {
      const ser = res.json();
      return ser;
    })
    .then((sers) => {
      if (sers.data.errors) {
        if (sers.data.errors[0].path === "email") {
          return checkinput("email is already used");
        }
        if (sers.data.errors[0].path === "phone_no") {
          return checkinput("Phone No Is already used is already used");
        }
      }
      document.getElementById("successname").innerHTML = `Registration Success
       Welcome ${name}
       Redirecting to login  `;
      document.getElementById("triggermodal").click();
      setTimeout(() => {
        window.location.replace("../index.html");
      }, 5000);
    })
    .catch((err) => console.log(err));
}
