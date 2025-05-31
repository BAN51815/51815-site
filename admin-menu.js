
const SUPABASE_URL = "https://odpjnxcyvcmivmccxtyo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kcGpueGN5dmNtaXZtY2N4dHlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MjI0MjQsImV4cCI6MjA2NDE5ODQyNH0.uGSV1BPGvjcjGTtYOg0TwCarGTgdZeVWULSbdis_hsA";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadMenus() {
  const { data, error } = await supabase
    .from("menus")
    .select("*")
    .order("order", { ascending: true });

  if (error) {
    console.error("メニューの取得に失敗:", error);
    return;
  }

  const tbody = document.querySelector("#menu-table tbody");
  tbody.innerHTML = "";

  data.forEach(item => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.title}</td>
      <td>${item.path}</td>
      <td>${item.order}</td>
      <td><input type="checkbox" class="visible-toggle"></td>
      <td><button class="delete">削除</button></td>
    `;

    const toggle = row.querySelector(".visible-toggle");
    toggle.checked = item.is_visible;
    toggle.addEventListener("change", async () => {
      const { error } = await supabase
        .from("menus")
        .update({ is_visible: toggle.checked })
        .eq("id", item.id);
      if (error) {
        alert("公開設定の更新に失敗しました");
        toggle.checked = !toggle.checked;
      }
    });

    row.querySelector(".delete").addEventListener("click", async () => {
      if (!confirm("このメニューを削除しますか？")) return;
      const { error } = await supabase.from("menus").delete().eq("id", item.id);
      if (!error) {
        row.remove();
      }
    });

    tbody.appendChild(row);
  });
}

document.querySelector("#add-menu").addEventListener("click", async () => {
  const title = document.querySelector("#new-title").value;
  const path = document.querySelector("#new-path").value;
  const order = parseInt(document.querySelector("#new-order").value, 10);

  if (!title || !path || isNaN(order)) {
    alert("すべての項目を入力してください");
    return;
  }

  const { error } = await supabase.from("menus").insert([{ title, path, order, is_visible: true }]);
  if (!error) {
    loadMenus();
    document.querySelector("#new-title").value = "";
    document.querySelector("#new-path").value = "";
    document.querySelector("#new-order").value = "";
  }
});

loadMenus();
