const user = localStorage.getItem("chatUser");
if (!user) {
  // ログインしてなければ戻す
  window.location.href = "index.html";
}

document.getElementById("welcome").textContent = `${user} さんのチャット`;

const messagesList = document.getElementById("messages");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

// 以前のメッセージを読み込み
let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];

// 画面表示更新
function renderMessages() {
  messagesList.innerHTML = "";
  messages.forEach((msg) => {
    const li = document.createElement("li");
    li.textContent = `${msg.user}: ${msg.text}`;
    messagesList.appendChild(li);
  });
}

renderMessages();

// 送信ボタンの処理
sendBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text === "") return;

  const msg = { user, text, time: new Date().toISOString() };
  messages.push(msg);
  localStorage.setItem("chatMessages", JSON.stringify(messages));

  input.value = "";
  renderMessages();
});
