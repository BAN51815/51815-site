const authFlag = localStorage.getItem('admin_auth');
if (authFlag !== 'true') {
  window.location.href = 'admin-top.html';
}

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabase = createClient("https://odpjnxcyvcmivmccxtyo.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kcGpueGN5dmNtaXZtY2N4dHlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MjI0MjQsImV4cCI6MjA2NDE5ODQyNH0.uGSV1BPGvjcjGTtYOg0TwCarGTgdZeVWULSbdis_hsA";

const menuArea = document.getElementById("menu-area");
const contentArea = document.getElementById("content-area");

async function loadAdminMenu() {
  const { data, error } = await supabase
    .from("admin_menus")
    .select("*")
    .order("order");

  if (error) {
    menuArea.innerHTML = "メニュー読み込み失敗";
    console.error(error);
    return;
  }

  menuArea.innerHTML = "";
  data.forEach(item => {
    const btn = document.createElement("button");
    btn.textContent = item.title;
    btn.addEventListener("click", () => loadPage(item.path));
    menuArea.appendChild(btn);
  });
}

async function loadPage(path) {
  try {
    const res = await fetch(path);
    const html = await res.text();
    contentArea.innerHTML = html;
  } catch (err) {
    contentArea.innerHTML = "ページ読み込み失敗";
  }
}

loadAdminMenu();
