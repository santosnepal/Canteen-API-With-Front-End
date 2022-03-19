let token;
let resp;
function logout() {
  localStorage.removeItem("usertoken");
  window.location.replace("../../index.html");
}
document.addEventListener("DOMContentLoaded", () => {
  token = localStorage.getItem("usertoken");
  if (token === null) {
    document.getElementById("launchmodel").click();
    setTimeout(() => {
      window.location.replace("../../index.html");
    }, 5000);
  }
  const a = fetch("http://localhost:9001/api/users", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => res.data);
  Promise.all([a]).then((res) => {
    resp = res[0];
    res[0].map((data) => {
      document.getElementById("user").innerHTML =
        document.getElementById("user").innerHTML +
        `
            <option value="${data.id},${data.profile_pic}">${data.name}</option>
            `;
    });
  });
  document.getElementById("user").addEventListener("change", (event) => {
    document.getElementById("error").hidden = false;
    document.getElementById("assign").disabled = false;
    const value = document.getElementById("user").value;
    const fvalue = value.split(",");
    document.getElementById(
      "selectedphoto"
    ).src = `http://localhost:9001/${fvalue[1]}`;
  });
  document.getElementById("assign").addEventListener("click", () => {
    const user_id = document.getElementById("user").value.split(",")[0];
    const value = document.getElementById("user").value;
    const password = document.getElementById("exampleInputPassword1").value;
    const repassword = document.getElementById("exampleInputPassword11").value;
    const fvalue = value.split(",");
    if (password === "" || repassword === "") {
      return $(document).Toasts("create", {
        class: "bg-warning",
        autohide: true,
        body: ` Please Fill Both Password `,
      });
    }
    if (password !== repassword) {
      return $(document).Toasts("create", {
        class: "bg-warning",
        autohide: true,
        body: ` Password and Re Password Do not match`,
      });
    }
    fetch(`http://localhost:9001/api/users/changepassword/${user_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          return $(document).Toasts("create", {
            class: "bg-success",
            autohide: true,
            body: `Selected User's Password changed Successfully`,
          });
        } else {
          return $(document).Toasts("create", {
            class: "bg-warning",
            autohide: true,
            body: ` Cannot change selected user's password`,
          });
        }
      });
  });
});
