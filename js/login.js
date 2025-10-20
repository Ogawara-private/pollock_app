document.getElementById("loginBtn").addEventListener("click", () => {
  const name = document.getElementById("username").value.trim();
  if (name === "") {
    alert("ユーザー名を入力してください");
    return;
  }
  // ローカルストレージに保存して次の画面へ
  localStorage.setItem("chatUser", name);
  window.location.href = "chat.html";
});
