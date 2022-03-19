function logout() {
  localStorage.removeItem("usertoken");
  window.location.replace("../../index.html");
}
let token;
document.addEventListener("DOMContentLoaded", () => {
  token = localStorage.getItem("usertoken");
  if (token === null) {
    document.getElementById("launchmodel").click();
    setTimeout(() => {
      window.location.replace("../../index.html");
    }, 5000);
  }
  fetch("http://localhost:9001/api/categories", {
    headers: {
      "Content-Type": "applcation/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      data.data.map((category) => {
        document.getElementById("user").innerHTML =
          document.getElementById("user").innerHTML +
          `
            <option value="${category.id},${category.name}">${category.name}</option>
            `;
      });
    });
  document.getElementById("assign").addEventListener("click", () => {
    const category_id = document.getElementById("user").value.split(",")[0];
    const names = document.getElementById("itemname").value;
    const price = document.getElementById("itemprice").value;
    console.log(names);
    if (category_id === "lol") {
      return $(document).Toasts("create", {
        class: "bg-warning",
        autohide: true,
        body: `Please Select a Category First`,
      });
    }
    if (names === "" || price === "") {
      return $(document).Toasts("create", {
        class: "bg-warning",
        autohide: true,
        body: `Please specify Name and Price Both`,
      });
    }
    fetch("http://localhost:9001/api/items", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({ name: names, category_id, price }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          return $(document).Toasts("create", {
            class: "bg-success",
            autohide: true,
            body: `${name} item For Category ${
              document.getElementById("user").value.split(",")[1]
            } Added`,
          });
        } else {
          return $(document).Toasts("create", {
            class: "bg-warning",
            autohide: true,
            body: `Could Not add category refresh and try again`,
          });
        }
      })
      .catch((err) => {
        return $(document).Toasts("create", {
          class: "bg-warning",
          autohide: true,
          body: `Could Not add category refresh and try again`,
        });
      });
  });
});
