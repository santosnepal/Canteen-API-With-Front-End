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
  Promise.all([a]).then((res) => {
    res[0].map((data) => {
      document.getElementById("user").innerHTML =
        document.getElementById("user").innerHTML +
        `
        <option value="${data.id},${data.profile_pic}">${data.name}</option>
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
    const amount = document.getElementById("itemprice").value;
    if (user_id === "UserName" || amount === "") {
      return $(document).Toasts("create", {
        class: "bg-warning",
        autohide: true,
        body: `Please Select user and Specify Amount`,
      });
    }
    fetch("http://localhost:9001/api/paidaccounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user_id, amount }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          return $(document).Toasts("create", {
            class: "bg-success",
            autohide: true,
            body: `Paid Amount of user recorded successfully `,
          });
        }
      });
  });
});
