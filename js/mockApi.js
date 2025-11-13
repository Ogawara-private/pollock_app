// 仮のデータを返す目的で作成

export function fetchPosts() {
  return new Promise((resolve) => {
    const mockData = [
      {
        type: "exam",
        name: "基本情報技術者試験",
        date: "2025-11-20",
        daysLeft: 8,
      },
      { type: "study", name: "Java", date: "2025-11-12", hours: 1.5 },
      { type: "study", name: "SQL", date: "2025-11-12", hours: 1.0 },
      { type: "memo", content: "今日の学習メモ" },
    ];
    // 0.5秒後に返す（擬似的なAPI通信）
    setTimeout(() => resolve(mockData), 500);
  });
}
