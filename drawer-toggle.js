
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const drawer = document.getElementById("drawer-menu");

  toggle.addEventListener("click", (e) => {
    drawer.classList.toggle("open");
    e.stopPropagation();
  });

  document.addEventListener("click", (e) => {
    if (drawer.classList.contains("open") && !drawer.contains(e.target) && e.target !== toggle) {
      drawer.classList.remove("open");
    }
  });
});
