let token;
document.addEventListener("DOMContentLoaded", () => {
  token = localStorage.getItem("usertoken");
  const a = fetch("http://localhost:9001/api/users", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => res.data);
  const b = fetch("http://localhost:9001/api/roles", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => res.data);
  Promise.all([a, b]).then((res) => {
    res[0].map((data) => {
      document.getElementById("user").innerHTML =
        document.getElementById("user").innerHTML +
        `
        <option value="${data.id},${data.profile_pic}">${data.name}</option>
        `;
    });
    res[1].map((data) => {
      document.getElementById("role").innerHTML =
        document.getElementById("role").innerHTML +
        `
        <option value="${data.id}">${data.name}</option>
        `;
    });
  });
  document.getElementById("user").addEventListener("change", (event) => {
    const value = document.getElementById("user").value;
    const fvalue = value.split(",");
    document.getElementById(
      "selectedphoto"
    ).src = `http://localhost:9001/${fvalue[1]}`;
  });
  document.getElementById("assign").addEventListener("click", () => {
    const user_id = document.getElementById("user").value.split(",")[0];
    const role_id = document.getElementById("role").value;
    if (user_id === "UserName" || role_id === "RoleName") {
      return $(document).Toasts("create", {
        class: "bg-warning",
        autohide: true,
        body: `Please Select user and Role From Dropdown Menu at first`,
      });
    }
    fetch("http://localhost:9001/api/user_roles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user_id, role_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          return $(document).Toasts("create", {
            class: "bg-success",
            autohide: true,
            body: `Role Assigned successfully to user`,
          });
        }
      });
  });
});
