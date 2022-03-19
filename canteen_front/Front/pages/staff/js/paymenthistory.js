function logout() {
  localStorage.removeItem("usertoken");
  window.location.replace("../../index.html");
}
let token = localStorage.getItem("usertoken");
let items;
function loaditems() {
  let a = 1;
  let b = 0;
  document.getElementById("itemsdata").innerHTML = "";
  fetch("http://localhost:9001/api/paidaccounts/get", {
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
                    <td>${item.created_at.split("T")[0]}</td>
                    <td>
                         ${item.amount}
                       
                    </td>`;
        a = a + 1;
        b = b + item.amount;
      });

      document.getElementById("itemsdata").innerHTML =
        document.getElementById("itemsdata").innerHTML +
        `
            <td></td>
            <td>Total Payment</td>
            <td>
            ${b}</td>`;
      fetch("http://localhost:9001/api/amounts", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          document.getElementById("itemsdata").innerHTML =
            document.getElementById("itemsdata").innerHTML +
            `
            <td></td>
            <td>${
              data[0].amount_to_pay < 0 ? "Amount to receive" : "Amount to pay"
            }</td>
            <td>${Math.abs(data[0].amount_to_pay)}</td>
            `;
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
