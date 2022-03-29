function logout() {
  localStorage.removeItem("usertoken");
  window.location.replace("../../index.html");
}
let token = localStorage.getItem("usertoken");
let items;
function loaditems(data) {
  let a = 1;
  let sum = 0;
  if (data) {
    document.getElementById("itemsdata").innerHTML = "";
    data.map((item) => {
      document.getElementById("itemsdata").innerHTML =
        document.getElementById("itemsdata").innerHTML +
        `
                <tr>
                <td>${a}</td>
                <td>${item.updated_at.split("T")[0]}</td>
                <td>${item.name}</td>
                <td>
                ${item.price}
                </td>
                <td>${item.quantity}</td>
                <td>
                     ${item.total}
                   
                </td>`;
      a = a + 1;
      sum = sum + item.total;
    });

    return (document.getElementById("itemsdata").innerHTML =
      document.getElementById("itemsdata").innerHTML +
      `
        <td></td>
        <td>Total Expenses</td>
        <td></td>
        <td></td>
        <td></td>
        <td>
        ${sum}</td>`);
  }
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
  document.getElementById("filter").addEventListener("click", () => {
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;
    if (start === "") {
      document.getElementById("starterror").hidden = false;
      setTimeout(() => {
        document.getElementById("starterror").hidden = true;
      }, 3000);
    }
    if (end === "") {
      document.getElementById("enderror").hidden = false;
      setTimeout(() => {
        document.getElementById("enderror").hidden = true;
      }, 3000);
    }
    if (start !== "" && end !== "") {
      const newstart = start.split("-").join("");
      const newend = end.split("-").join("");
      document.getElementById("reset").hidden = false;
      fetch("http://localhost:9001/api/orders/history/filtered", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ start: newstart, end: newend }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            loaditems(data.data);
          }
        });
    }
  });
  document.getElementById("reset").addEventListener("click", () => {
    document.getElementById("end").value = "";
    document.getElementById("start").value = "";
    document.getElementById("reset").hidden = true;
    loaditems();
  });
  document.getElementById("down").addEventListener("click", () => {
    generatepdf();
  });
});
function generatepdf() {
  const element = document.getElementById("orderbox");
  html2pdf().from(element).save();
}
