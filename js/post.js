// フォームの要素を取得
const widgetType = document.getElementById("widgetType");
const formArea = document.getElementById("formArea");
const postBtn = document.getElementById("postBtn");

// ----------------------------
// 1️⃣ 選択に応じてフォーム切り替え
// ----------------------------
widgetType.addEventListener("change", updateForm);

function updateForm() {
  const type = widgetType.value;
  formArea.innerHTML = ""; // 一旦リセット

  if (type === "exam") {
    // 試験カウントダウンhtmlで記述
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
    <div class="study-form">
      <label>日付：</label>
      <input type="date" id="studyDate" class="input-field">

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
// 2️⃣ 投稿ボタンクリック時の処理
// ----------------------------
postBtn.addEventListener("click", () => {
  const type = widgetType.value;
  let data = {};

  if (type === "exam") {
    const name = document.getElementById("examName").value;
    const date = document.getElementById("examDate").value;

    if (!name || !date) return alert("試験名と日付を入力してください");

    // カウントダウン計算
    const daysLeft = Math.ceil(
      (new Date(date) - new Date()) / (1000 * 60 * 60 * 24)
    );
    data = { type, name, date, daysLeft };
    alert(`${name} まであと ${daysLeft} 日！`);
  } else if (type === "study") {
    const date = document.getElementById("studyDate").value;
    const hours = document.getElementById("studyHours").value;

    if (!date || !hours) return alert("日付と学習時間を入力してください");
    data = { type, date, hours };
    alert(`${date} に ${hours} 時間勉強しました！`);
  } else if (type === "memo") {
    const content = document.getElementById("memoContent").value;
    if (!content) return alert("メモを入力してください");
    data = { type, content };
    alert("メモを投稿しました！");
  }

  console.log("投稿データ：", data);
  // ここで localStorage や サーバー に保存する処理を追加できる
});

// 初期状態のフォームを表示
updateForm();
