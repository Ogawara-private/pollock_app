document.getElementById("registerBtn").addEventListener("click", () => {
  const username = document.getElementById("reg-username").value.trim();
  const password = document.getElementById("reg-password").value.trim();
  const confirm = document.getElementById("reg-password-confirm").value.trim();

  if (!username || !password || !confirm) {
    alert("すべての項目を入力してください");
    return;
  }

  if (password !== confirm) {
    alert("パスワードが一致しません");
    return;
  }

  // 既存ユーザー確認
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const exists = users.find((u) => u.username === username);
  if (exists) {
    alert("このユーザー名はすでに登録されています");
    return;
  }

  // 登録処理
  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("登録が完了しました！ログイン画面に戻ります");
  window.location.href = "index.html";
});
