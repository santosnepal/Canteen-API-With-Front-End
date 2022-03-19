function logout() {
  localStorage.removeItem("usertoken");
  window.location.replace("../../index.html");
}
let token = localStorage.getItem("usertoken");
let items;
function loaditems() {
  let a = 1;
  document.getElementById("itemsdata").innerHTML = "";
  fetch("http://localhost:9001/api/creditaccounts", {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      items = data.data;
      items.map((item) => {
        document.getElementById("itemsdata").innerHTML =
          document.getElementById("itemsdata").innerHTML +
          `
                  <tr>
                  <td>${a}</td>
                  <td>${item.order.updated_at.split("T")[0]}</td>
                  <td>${item.order.item.name}</td>
                  <td>
                  ${item.order.item.price}
                  </td>
                  <td>${item.order.quantity}</td>
                  <td>
                       ${item.total}
                     
                  </td>`;
        a = a + 1;
      });
      fetch("http://localhost:9001/api/expenses", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          document.getElementById("itemsdata").innerHTML =
            document.getElementById("itemsdata").innerHTML +
            `
          <td></td>
          <td>Total Expenses</td>
          <td></td>
          <td></td>
          <td></td>
          <td>
          ${data.data[0].sum}</td>`;
        });
    });
}
document.addEventListener("DOMContentLoaded", () => {
  if (token === null) {
    document.getElementById("launchmodel").click();
    setTimeout(() => {
      window.location.replace("../../index.html");
    }, 5000);
  }
  loaditems();
});
