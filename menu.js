import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient("https://odpjnxcyvcmivmccxtyo.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kcGpueGN5dmNtaXZtY2N4dHlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MjI0MjQsImV4cCI6MjA2NDE5ODQyNH0.uGSV1BPGvjcjGTtYOg0TwCarGTgdZeVWULSbdis_hsA");

async function loadMenu() {
  const container = document.getElementById("menu-container");
  const content = document.getElementById("content");
  const { data, error } = await supabase
    .from("menus")
    .select("*")
    .eq("is_visible", true)
    .order("order");

  if (error) {
    container.innerHTML = "メニュー読み込み失敗";
    console.error(error);
    return;
  }

  container.innerHTML = "";
  data.forEach(item => {
    const btn = document.createElement("button");
    btn.textContent = item.title;
    btn.onclick = () => {
      content.innerHTML = `<h2>$\{item.title}</h2><p>ここに「$\{item.path}」の中身を表示</p>`;
    };
    container.appendChild(btn);
  });
}

loadMenu();