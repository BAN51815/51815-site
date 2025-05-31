
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const drawer = document.getElementById("drawer-menu");

  // ドロワー内部に閉じるボタンを追加（☰）
  const closeBtn = document.createElement("div");
  closeBtn.textContent = "☰";
  closeBtn.style.padding = "1rem";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.fontSize = "1.5rem";
  drawer.insertBefore(closeBtn, drawer.firstChild);

  function closeDrawer() {
    drawer.classList.remove("open");
  }

  toggle.addEventListener("click", (e) => {
    drawer.classList.toggle("open");
    e.stopPropagation();
  });

  closeBtn.addEventListener("click", (e) => {
    closeDrawer();
    e.stopPropagation();
  });

  document.addEventListener("click", (e) => {
    if (drawer.classList.contains("open") && !drawer.contains(e.target) && e.target !== toggle) {
      closeDrawer();
    }
  });
});
