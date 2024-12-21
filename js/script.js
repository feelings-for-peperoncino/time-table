// タイムテーブルデータ
const timetables = {
  A006: [
      { time: "10:50", location: "出勤" },
      { time: "11:10", location: "営業所" },
      { time: "11:39-11:50", location: "松本南 (3番口)" },
      { time: "12:45-12:55", location: "伊那" },
      { time: "13:25-14:25", location: "駒ヶ根 (休憩 13:33-14:17)" },
      { time: "14:50-14:55", location: "伊那" },
      { time: "15:50", location: "松本南" },
      { time: "16:19-17:03", location: "営業所 (休憩)" },
      { time: "17:04-17:15", location: "松本南 (5番口)" },
      { time: "18:35-18:45", location: "下諏訪" },
      { time: "19:05-19:15", location: "岡谷" },
      { time: "19:55", location: "松本南" }
  ],
  A007: [
      { time: "10:50", location: "出勤" },
      { time: "11:10", location: "営業所" },
      { time: "11:39-11:50", location: "松本南 (5番口)" },
      { time: "12:30-12:35", location: "岡谷" },
      { time: "12:45-13:35", location: "下諏訪 (休憩 12:53-13:27)" },
      { time: "13:45-13:55", location: "岡谷" },
      { time: "14:35", location: "松本南" },
      { time: "15:15-15:30", location: "松本南 (3番口)" },
      { time: "16:15-19:00", location: "茅野 (休憩 16:26-18:49)" },
      { time: "19:45", location: "松本南" }
  ],
  A011: [
      { time: "6:20", location: "出勤" },
      { time: "6:40", location: "営業所" },
      { time: "6:40-6:50", location: "松本南 (2番口)" },
      { time: "7:20-7:30", location: "里山辺" },
      { time: "8:10-9:10", location: "会田 (休憩 8:32-9:05)" },
      { time: "10:10", location: "松本南 (ガソリンスタンド)" },
      { time: "10:45-11:47", location: "営業所 (休憩 10:45-11:47)" },
      { time: "11:48-11:55", location: "松本南 (7番口)" },
      { time: "12:55-13:10", location: "会田" },
      { time: "14:10", location: "松本南" },
      { time: "14:22", location: "営業所" },
      { time: "15:30-17:05", location: "会田 (休憩 15:35-17:00)" },
      { time: "18:05", location: "松本南" }
  ]
};

// HTML要素の取得
const selectionSection = document.getElementById("selection-section");
const currentTimeSection = document.getElementById("current-time-section");
const timetableSection = document.getElementById("timetable-section");
const timetableElement = document.getElementById("timetable");
const backButton = document.getElementById("back-button");

// 現在時刻とタイムテーブルの比較処理
function updateCurrentTimeSection(id) {
  const now = new Date();
  const currentTime = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

  const timetable = timetables[id];
  let before = null, nowTask = null, next = null;

  for (let i = 0; i < timetable.length; i++) {
      const entry = timetable[i];
      const [startTime, endTime] = entry.time.includes('-') ? entry.time.split('-') : [entry.time, entry.time];

      if (currentTime >= startTime && currentTime <= endTime) {
          nowTask = entry;
          before = timetable[i - 1] || null;
          next = timetable[i + 1] || null;
          break;
      }

      if (currentTime < startTime && !next) {
          next = entry;
      }

      if (currentTime >= endTime) {
          before = entry;
      }
  }

  // `now` がない場合に補正
  if (!nowTask && next) {
      nowTask = next;
      next = timetable[timetable.indexOf(next) + 1] || null;
  }

  // 表示を更新
  document.getElementById("before").textContent = `Before: ${before ? `${before.time} - ${before.location}` : '--'}`;
  document.getElementById("now").textContent = `Now: ${nowTask ? `${nowTask.time} - ${nowTask.location}` : '--'}`;
  document.getElementById("next").textContent = `Next: ${next ? `${next.time} - ${next.location}` : '--'}`;
}

// タイムテーブル表示
function showTimetable(id) {
  timetableElement.innerHTML = ""; // リセット
  timetables[id].forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.time} - ${item.location}`;
      timetableElement.appendChild(li);
  });

  // 現在時刻セクションを更新
  updateCurrentTimeSection(id);

  // 画面遷移
  selectionSection.style.display = "none";
  currentTimeSection.style.display = "block";
  timetableSection.style.display = "block";
}

// タイムテーブル選択
document.querySelectorAll(".timetable-button").forEach(button => {
  button.addEventListener("click", () => {
      const id = button.dataset.id;
      showTimetable(id);
  });
});

// 戻るボタン
backButton.addEventListener("click", () => {
  selectionSection.style.display = "block";
  currentTimeSection.style.display = "none";
  timetableSection.style.display = "none";
});



