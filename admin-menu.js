import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabase = createClient("https://odpjnxcyvcmivmccxtyo.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kcGpueGN5dmNtaXZtY2N4dHlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MjI0MjQsImV4cCI6MjA2NDE5ODQyNH0.uGSV1BPGvjcjGTtYOg0TwCarGTgdZeVWULSbdis_hsA");

const form = document.getElementById("menu-form");
const list = document.getElementById("menu-list");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const path = document.getElementById("path").value;
  const order = parseInt(document.getElementById("order").value, 10);
  const is_visible = document.getElementById("is_visible").checked;

  const { error } = await supabase.from("menus").insert([{ title, path, order, is_visible }]);
  if (error) {
    alert("追加失敗：" + error.message);
  } else {
    form.reset();
    loadMenus();
  }
});

async function loadMenus() {
  const { data } = await supabase.from("menus").select("*").order("order");
  list.innerHTML = "";
  data.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `<strong>$\{item.title}</strong> ($\{item.path}) [${item.is_visible ? '表示' : '非表示'}]`;
    list.appendChild(div);
  });
}

loadMenus();