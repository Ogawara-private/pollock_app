// フォーム要素
const widgetType = document.getElementById("widgetType");
const formArea = document.getElementById("formArea");
const postBtn = document.getElementById("postBtn");
const historyList = document.getElementById("historyList");

// localStorageキー
const STORAGE_KEY = "studyPosts";

// 投稿データ
let posts = [];

// ----------------------------
// ページ読み込み時に履歴を読み込む
// ----------------------------
window.addEventListener("DOMContentLoaded", () => {
  posts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  renderHistory();
  updateForm();
});

// ----------------------------
// フォーム切替
// ----------------------------
widgetType.addEventListener("change", updateForm);

function updateForm() {
  const type = widgetType.value;
  formArea.innerHTML = ""; // 一旦リセット

  if (type === "exam") {
    formArea.innerHTML = `
       <div class="exam-form">
     <div class="exam-form1">
      <label>試験名：</label>
      <input type="text" id="examName" class="input-field" placeholder="例：基本情報技術者試験">
     </div>

     <div class="exam-form2">
      <label>試験日：</label>
      <input type="date" id="examDate" class="input-field">
     </div>
      <p id="countdown" class="countdown-text"></p>
    </div>
    `;
  } else if (type === "study") {
    // 学習時間
    formArea.innerHTML = `
    <div class="study-form1">
      <label>日付：</label>
      <input type="date" id="studyDate" class="input-field">
    </div>

    <div class="study-form2">
      <label>勉強した資格名：</label>
      <input type="text" id="studyName" class="input-field">
    </div>

    <div class="study-form3">
      <label>学習時間（時間）：</label>
      <input type="number" id="studyHours" placeholder="例：15分⇒0.25,30分⇒0.5,1時間⇒1.0" class="input-field">
    </div>
    `;
  } else if (type === "memo") {
    // メモ
    formArea.innerHTML = `
    <div class="memo-form">
      <label>内容：</label>
      <textarea id="memoContent" class="memo-textarea" placeholder="学習メモを記録"></textarea>
    </div>
    `;
  }
}

// ----------------------------
// 履歴描画
// ----------------------------
function renderHistory() {
  if (!historyList) return;
  historyList.innerHTML = posts
    .map((p) => {
      switch (p.type) {
        case "exam":
          return `<li>📘試験名: ${p.name}, 試験日: ${p.date}, 残り ${p.daysLeft}日</li>`;
        case "study":
          return `<li>⏰学習: ${p.date}, ${p.name}, 時間: ${p.hours}</li>`;
        case "memo":
          return `<li>📝メモ: ${p.content}</li>`;
        default:
          return `<li>不明なデータ</li>`;
      }
    })
    .join("");
}

// ----------------------------
// 投稿ボタン
// ----------------------------
postBtn.addEventListener("click", () => {
  const type = widgetType.value;
  let data = {};

  if (type === "exam") {
    const name = document.getElementById("examName").value;
    const date = document.getElementById("examDate").value;
    if (!name || !date) return alert("試験名と日付を入力してください");
    const daysLeft = Math.ceil(
      (new Date(date) - new Date()) / (1000 * 60 * 60 * 24)
    );
    data = { type, name, date, daysLeft };
  } else if (type === "study") {
    const date = document.getElementById("studyDate").value;
    const name = document.getElementById("studyName").value;
    const hours = document.getElementById("studyHours").value;
    if (!date || !hours) return alert("日付と学習時間を入力してください");
    data = { type, date, name, hours };
  } else if (type === "memo") {
    const content = document.getElementById("memoContent").value;
    if (!content) return alert("メモを入力してください");
    data = { type, content };
  }

  // 保存
  posts.unshift(data);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  renderHistory();
});
