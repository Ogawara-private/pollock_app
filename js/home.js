const STORAGE_KEY = "studyPosts";
const posts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// ------------------------------------
// 最近の履歴（上位5件）
// ------------------------------------
const historyList = document.querySelector("#recentHistory ul");
if (historyList) {
  historyList.innerHTML = posts
    .slice(0, 5)
    .map((p) => {
      switch (p.type) {
        case "exam":
          return `<li><strong>📘試験名：</strong>${
            p.name || "（不明）"
          } <strong>試験日：</strong>${p.date || "未設定"} - 残り ${
            p.daysLeft ?? "?"
          }日</li>`;
        case "study":
          return `<li><strong>⏰学習：</strong>${p.date || "未設定"} に ${
            p.name || "未設定"
          }を ${p.hours || 0} 時間</li>`;
        case "memo":
          return `<li><strong>📝メモ：</strong>${
            p.content || "（内容なし）"
          }</li>`;
        default:
          return `<li>不明なデータ</li>`;
      }
    })
    .join("");
}

// 最後に追加
renderRanking(posts);

// 学習履歴(posts)からランキング作成
function renderRanking(posts) {
  const rankingList = document.getElementById("rankingList");
  if (!rankingList) return;

  // studyタイプだけ抽出
  const studyPosts = posts.filter((p) => p.type === "study");

  // 名前ごとに累計時間を計算
  const totals = {};
  studyPosts.forEach((p) => {
    const name = p.name || "（科目名なし）";
    const hours = parseFloat(p.hours) || 0;
    if (!totals[name]) totals[name] = 0;
    totals[name] += hours;
  });

  // 累計時間で降順ソート
  const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);

  // 上位3件だけ表示
  rankingList.innerHTML = sorted
    .slice(0, 3)
    .map(([name, hours]) => `<li>${name}: ${hours} 時間</li>`)
    .join("");
}

// ------------------------------------
// 試験日カウントダウン（複数対応）
// ------------------------------------
const examContainer = document.getElementById("examCountdown");
if (examContainer) {
  const examPosts = posts.filter((p) => p.type === "exam" && p.date);

  examPosts.forEach((exam) => {
    const targetDate = new Date(exam.date);
    const diff = targetDate - new Date();
    const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
    const examName = exam.name || "試験";

    const item = document.createElement("div");
    item.textContent = `・${examName}：あと${daysLeft}日！`;
    examContainer.appendChild(item);
  });

  if (examPosts.length === 0) {
    examContainer.textContent = "登録された試験はありません";
  }
}

// ------------------------------------
// 資格別に学習時間を集計
// ------------------------------------
const studyPosts = posts.filter((p) => p.type === "study");
const hoursByExam = {};

studyPosts.forEach((p) => {
  const name = p.name || "不明";
  const hours = parseFloat(p.hours) || 0;
  hoursByExam[name] = (hoursByExam[name] || 0) + hours;
});

// グラフ用データ生成
const labels = Object.keys(hoursByExam);
const data = Object.values(hoursByExam);

// ランダムカラー生成（任意入力でもOK！）
const colors = labels.map(() => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgba(${r}, ${g}, ${b}, 0.6)`;
});

// Chart.js 描画
const ctx = document.getElementById("weeklyChart");
if (ctx && typeof Chart !== "undefined") {
  new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "資格別 学習時間（h）",
          data,
          backgroundColor: colors,
          borderRadius: 8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: "今週の資格ごとの学習時間",
          font: { size: 16 },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: "時間" },
        },
      },
    },
  });
}

// ------------------------------------
// 先週・今週の曜日別学習時間を集計
// ------------------------------------
function getWeekHours(posts) {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=日曜, 1=月曜
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // 今週月曜までの日数
  const thisMonday = new Date(today);
  thisMonday.setDate(today.getDate() + mondayOffset);
  thisMonday.setHours(0, 0, 0, 0);

  const lastMonday = new Date(thisMonday);
  lastMonday.setDate(thisMonday.getDate() - 7);

  // 曜日別配列（0:月～6:日）
  const lastWeekData = Array(7).fill(0);
  const thisWeekData = Array(7).fill(0);

  posts
    .filter((p) => p.type === "study" && p.date)
    .forEach((p) => {
      const d = new Date(p.date);
      const hours = parseFloat(p.hours) || 0;

      // 今週
      if (
        d >= thisMonday &&
        d < new Date(thisMonday.getTime() + 7 * 24 * 60 * 60 * 1000)
      ) {
        const idx = d.getDay() === 0 ? 6 : d.getDay() - 1; // 0=日→6, 1=月→0
        thisWeekData[idx] += hours;
      }
      // 先週
      else if (d >= lastMonday && d < thisMonday) {
        const idx = d.getDay() === 0 ? 6 : d.getDay() - 1;
        lastWeekData[idx] += hours;
      }
    });

  return { lastWeekData, thisWeekData };
}

const { lastWeekData, thisWeekData } = getWeekHours(posts);

// ------------------------------------
// Chart.js 描画
// ------------------------------------
const ctxComparison = document.getElementById("weeklyComparisonChart");
if (ctxComparison && typeof Chart !== "undefined") {
  new Chart(ctxComparison, {
    type: "bar",
    data: {
      labels: ["月", "火", "水", "木", "金", "土", "日"],
      datasets: [
        {
          label: "先週",
          data: lastWeekData,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderRadius: 6,
        },
        {
          label: "今週",
          data: thisWeekData,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true },
        title: {
          display: true,
          text: "曜日別学習時間比較（先週 vs 今週）",
          font: { size: 16 },
        },
      },
      scales: {
        y: { beginAtZero: true, title: { display: true, text: "時間" } },
      },
    },
  });
}
