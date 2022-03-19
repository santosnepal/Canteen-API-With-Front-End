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
      if (data.roles.length !== 1) {
        document.getElementById("user").innerHTML =
          document.getElementById("user").innerHTML +
          `
            <option value="${data.id},${data.profile_pic},${res[0].indexOf(
            data
          )}">${data.name}</option>
            `;
      }
    });
  });
  document.getElementById("user").addEventListener("change", (event) => {
    document.getElementById("error").innerHTML = "";
    document.getElementById("assign").disabled = false;
    const value = document.getElementById("user").value;
    const fvalue = value.split(",");
    if (resp[fvalue[2]].roles.length === 1) {
      document.getElementById(
        "error"
      ).innerHTML = `<h5>Sorry Cannot Revoke Role of user having single role</h5>`;
      document.getElementById("assign").disabled = true;
    } else {
      resp[fvalue[2]].roles.map((data) => {
        document.getElementById("error").innerHTML =
          document.getElementById("error").innerHTML +
          `<br>
            <input type="checkbox" id="${data.id}" value="${
            resp[fvalue[2]].name
          }" ${data.name === "user" && "disabled"} class="form-check-input" >
            <label class="form-check-label" for="${data.id}"  >${
            data.name
          }</label>
            <br>`;
      });
    }
    document.getElementById(
      "selectedphoto"
    ).src = `http://localhost:9001/${fvalue[1]}`;
  });
  document.getElementById("assign").addEventListener("click", () => {
    const user_id = document.getElementById("user").value.split(",")[0];
    const value = document.getElementById("user").value;
    const fvalue = value.split(",");
    resp[fvalue[2]].roles.map((data) => {
      if (data.name !== "user") {
        const a = document.getElementById(data.id);
        if (a.checked) {
          fetch("http://localhost:9001/api/user_roles/delete", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ user_id, role_id: a.id }),
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.status === 200) {
                a.checked = false;
                return $(document).Toasts("create", {
                  class: "bg-success",
                  autohide: true,
                  body: `${a.value} Revoked From Selected User`,
                });
              } else {
                return $(document).Toasts("create", {
                  class: "bg-warning",
                  autohide: true,
                  body: ` ${a.value} Revoked From Selected User Failed`,
                });
              }
            });
        }
      }
    });
  });
});
