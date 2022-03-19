function logout() {
  localStorage.removeItem("usertoken");
  window.location.replace("../../index.html");
}
let token = localStorage.getItem("usertoken");
let items;
const ChangeAvilability = (itemid) => {
  fetch("http://localhost:9001/api/items/changeavilability", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ item_id: itemid }),
  })
    .then((res) => res.json())
    .then((data) => loaditems());
};
function loaditems() {
  let a = 1;
  document.getElementById("itemsdata").innerHTML = "";
  fetch("http://localhost:9001/api/items", {
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
          <td>${item.name}</td>
          <td>${item.category.name}</td>
          <td>${item.avilability ? "Avilable" : "Not Avilable"}</td>
          <td>${
            item.avilability
              ? `<button type="button" onclick="ChangeAvilability(${item.id})" class="btn btn-primary bg-danger" >Make Not Avilable</button>`
              : `<button type="button" onclick="ChangeAvilability(${item.id})" class="btn btn-primary bg-success" >Make Avilable</button>`
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
