let token;
document.addEventListener("DOMContentLoaded", () => {
  token = localStorage.getItem("usertoken");
  loader();
});
function loader() {
  const a = fetch("http://localhost:9001/api/staffcount", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data.data[0]);
  const b = fetch("http://localhost:9001/api/customercount", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data.data[0]);
  const c = fetch("http://localhost:9001/api/itemcount", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data.data[0]);
  const d = fetch("http://localhost:9001/api/pendingordercount", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data.data[0]);
  const e = fetch("http://localhost:9001/api/orders/today", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data.data);
  Promise.all([a, b, c, d, e]).then((res) => {
    document.getElementById("staffnumber").innerHTML = res[0].count;
    document.getElementById("customernumber").innerHTML = res[1].count;
    document.getElementById("itemsnumber").innerHTML = res[2].count;
    document.getElementById("ufordernumber").innerHTML = res[3].count;
    res[4].map((data) => {
      document.getElementById("orderbox").innerHTML =
        document.getElementById("orderbox").innerHTML +
        `
      <div class="direct-chat-messages">
        <div class="direct-chat-msg">
          <div class="direct-chat-infos clearfix">
            <span class="direct-chat-name float-left"
              > Orderer: ${data.user_name}</span
            >
            <span class="direct-chat-timestamp float-right"> When: ${new Date()}</span>
          </div>
          <!-- /.direct-chat-infos -->
          
          <div class="direct-chat-text"> Item Name:${
            data.item_name
          }<br> Quantity: ${data.quantity}</div>
          <!-- /.direct-chat-text -->
        </div>
      </div>
    </div>`;
    });
  });
}
