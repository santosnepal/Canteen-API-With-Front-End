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
  document.getElementById("assign").addEventListener("click", () => {
    const name = document.getElementById("itemname").value;
    if (name === "") {
      return $(document).Toasts("create", {
        class: "bg-warning",
        autohide: true,
        body: ` Please Specify Category Name`,
      });
    }
    fetch("http://localhost:9001/api/categories", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          return $(document).Toasts("create", {
            class: "bg-success",
            autohide: true,
            body: `New Category ${name} Added successfully`,
          });
        }
        return $(document).Toasts("create", {
          class: "bg-success",
          autohide: true,
          body: `New Category ${name} Cannot Be added`,
        });
      });
  });
});
