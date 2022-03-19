function logout() {
  localStorage.removeItem("usertoken");
  window.location.replace("../../index.html");
}
let token = localStorage.getItem("usertoken");
let items;
const ChangeStatus = (orderid) => {
  fetch(`http://localhost:9001/api/orders/complete/${orderid}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => loaditems());
};
function loaditems() {
  let a = 1;
  document.getElementById("itemsdata").innerHTML = "";
  fetch("http://localhost:9001/api/orders/today/all", {
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
            <td>${item.quantity}</td>
            <td>
            <img src="http://localhost:9001/${
              item.user_profile_pic
            }" style="height:50px;width:50px"></img>
            <label >${item.user_name}</label>
            </td>
            <td>${item.status ? "Delivered" : "Not Delivered"}</td>
            <td>${
              item.status
                ? `<button type="button" onclick="ChangeStatus(${item.id})" class="btn btn-primary bg-danger" >Mark Not Delivered</button>`
                : `<button type="button" onclick="ChangeStatus(${item.id})" class="btn btn-primary bg-success" >Mark Delivered</button>`
            }</td>
        `;
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
