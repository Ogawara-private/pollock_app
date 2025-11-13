document.getElementById("loginBtn").addEventListener("click", () => {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const found = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!found) {
    alert("ユーザー名またはパスワードが間違っています");
    return;
  }

  localStorage.setItem("chatUser", username);
  window.location.href = "home.html";
});
