function logout() {
  localStorage.removeItem("usertoken");
  window.location.replace("../../index.html");
}
let token = localStorage.getItem("usertoken");
let items;
const DeleteOrder = (itemid) => {
  fetch(`http://localhost:9001/api/orders/delete`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ orderId: itemid }),
  })
    .then((res) => res.json())
    .then((data) => {
      $(document).Toasts("create", {
        class: "bg-success",
        autohide: true,
        body: ` Order Deleted successfully`,
      });
      return loaditems();
    });
};
function ModifyOrder(orderid) {
  const quantity = document.getElementById(orderid).value;
  if (quantity === "") {
    console.log("here");
    return $(document).Toasts("create", {
      class: "bg-warning",
      autohide: true,
      body: ` Please Specify Quantity`,
    });
  }
  fetch(`http://localhost:9001/api/orders/modify/${orderid}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ quantity }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      $(document).Toasts("create", {
        class: "bg-success",
        autohide: true,
        body: ` Order Modify successfully`,
      });
      return loaditems();
    });
  console.log(orderid);
}
function loaditems() {
  let a = 1;
  document.getElementById("itemsdata").innerHTML = "";
  fetch("http://localhost:9001/api/orders/today/my", {
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
                <td>${item.item_name}</td>
                <td>
                ${item.item_price}
                </td>
                <td><input type="number" id="${item.id}" placeholder=${item.quantity}></input></td>
                <td>
                     <button type="button" onclick="DeleteOrder(${item.id})" class="btn btn-primary bg-error" >Delete Order</button>
                     <button type="button" onclick="ModifyOrder(${item.id})" class="btn btn-primary bg-info" >Modify Order</button>
                   
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
