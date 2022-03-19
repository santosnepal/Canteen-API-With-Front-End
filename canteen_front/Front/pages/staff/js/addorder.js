function logout() {
  localStorage.removeItem("usertoken");
  window.location.replace("../../index.html");
}
let token = localStorage.getItem("usertoken");
let items;
const Order = (itemid) => {
  const quantity = document.getElementById(itemid).value;
  if (quantity === "") {
    console.log("here");
    return $(document).Toasts("create", {
      class: "bg-warning",
      autohide: true,
      body: ` Please Specify Quantity`,
    });
  }
  fetch(`http://localhost:9001/api/orders`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ item_id: itemid, quantity }),
  })
    .then((res) => res.json())
    .then((data) => {
      $(document).Toasts("create", {
        class: "bg-success",
        autohide: true,
        body: ` New Order has placed successfully`,
      });
      loaditems();
    });
};
function loaditems() {
  let a = 1;
  document.getElementById("itemsdata").innerHTML = "";
  fetch("http://localhost:9001/api/items/avilable", {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      items = data.data;
      console.log(items);
      items.map((item) => {
        document.getElementById("itemsdata").innerHTML =
          document.getElementById("itemsdata").innerHTML +
          `
              <tr>
              <td>${a}</td>
              <td>${item.name}</td>
              <td>${item.category.name}</td>
              <td>
              ${item.price}
              </td>
              <td><input type="number" id="${item.id}" placeholder="Please Specify Order Quantity"></input></td>
              <td>
                   <button type="button" onclick="Order(${item.id})" class="btn btn-primary bg-success" >Order</button>
                 
              </td>`;
        a = a + 1;
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
