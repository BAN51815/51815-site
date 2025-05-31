
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://odpjnxcyvcmivmccxtyo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kcGpueGN5dmNtaXZtY2N4dHlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MjI0MjQsImV4cCI6MjA2NDE5ODQyNH0.uGSV1BPGvjcjGTtYOg0TwCarGTgdZeVWULSbdis_hsA'
);

const menuContainer = document.getElementById("menu-container");
const drawerMenu = document.getElementById("drawer-menu");

const { data, error } = await supabase
  .from("menus")
  .select("*")
  .eq("is_visible", true)
  .order("order");

if (error) {
  console.error("メニューの読み込みに失敗しました", error);
} else {
  menuContainer.innerHTML = "";
  drawerMenu.innerHTML = "";

  data.forEach((item) => {
    const btn = document.createElement("button");
    btn.textContent = item.title;
    btn.onclick = () => {
      document.getElementById("content").textContent = `${item.title}ページを開きます`;
      drawerMenu.classList.remove("open");
    };

    const clone = btn.cloneNode(true); // スマホ用にも別要素
    clone.onclick = btn.onclick;

    menuContainer.appendChild(btn);  // PC用
    drawerMenu.appendChild(clone);  // スマホ用
  });
}
