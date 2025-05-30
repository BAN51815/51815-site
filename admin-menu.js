
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>管理メニュー</title>
  <style>
    body {
      font-family: sans-serif;
      padding: 2rem;
      background-color: #f0f0f0;
    }
    h1 {
      color: #333;
    }
  </style>
</head>
<body>
  <h1>管理メニュー</h1>
  <p>このページは管理者のみがアクセスできます。</p>

  <script>
    // 認証チェック
    if (localStorage.getItem("carelay_admin_auth") !== "true") {
      alert("管理者としてログインしてください");
      window.location.href = "admin-top.html";
    }
  </script>
</body>
</html>
