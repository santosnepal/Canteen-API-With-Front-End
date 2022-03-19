function logout() {
  localStorage.removeItem("usertoken");
  window.location.replace("../../index.html");
}
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("usertoken");
  if (token === null) {
    document.getElementById("launchmodel").click();
    setTimeout(() => {
      window.location.replace("../../index.html");
    }, 5000);
  }
});
