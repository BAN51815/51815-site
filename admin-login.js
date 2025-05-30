import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabase = createClient("https://odpjnxcyvcmivmccxtyo.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kcGpueGN5dmNtaXZtY2N4dHlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MjI0MjQsImV4cCI6MjA2NDE5ODQyNH0.uGSV1BPGvjcjGTtYOg0TwCarGTgdZeVWULSbdis_hsA");

const form = document.getElementById("login-form");
const msg = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email, password
  });

  if (error) {
    msg.textContent = "ログイン失敗：" + error.message;
    return;
  }

  // 認証成功 → フラグ保存して管理画面に進む
  localStorage.setItem("carelay_admin_auth", "true");
  window.location.href = "admin-menu.html";
});