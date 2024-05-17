// 獲取用於顯示抽籤結果的元素
var resultElement = document.getElementById("result");

// 監聽開始抽籤按鈕的點擊事件
function startDraw() {
  var numOfPeople = parseInt(document.getElementById("numOfPeople").value);
  var numOfGroups = parseInt(document.getElementById("numOfGroups").value);

  if (isNaN(numOfPeople) || isNaN(numOfGroups)) {
    alert("請輸入有效的人數和分組數量。");
    return;
  }

  drawCards(numOfPeople, numOfGroups);
}

// 生成卡牌
function drawCards(numOfPeople, numOfGroups) {
  var cardsContainer = document.getElementById("cards");
  cardsContainer.innerHTML = ""; // 清空容器

  var availableGroups = ["A", "B", "C", "D"]; // 可用的分組組別

  // 將可用的分組組別複製多份以保證每個人都有對應的組別
  var groups = [];
  for (var i = 0; i < numOfGroups; i++) {
    groups = groups.concat(availableGroups);
  }

  // 將分組組別洗牌
  for (var i = groups.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [groups[i], groups[j]] = [groups[j], groups[i]]; // 交換兩個元素的位置
  }

  // 為每個按鈕分配一個分組組別
  for (var i = 1; i <= numOfPeople; i++) {
    var card = document.createElement("button");
    card.classList.add("card");
    card.textContent = "按鈕 " + i;
    card.addEventListener("click", function() {
      var group = groups.pop(); // 從分組組別列表中取出一個分組組別
      drawLot(group);
      this.textContent = group + "組"; // 將按鈕的文字設置為分組組別
      this.disabled = true; // 禁用按鈕
    });
    cardsContainer.appendChild(card);
  }
}

// 抽籤函數
function drawLot(group) {
  var resultContainer = document.getElementById("result");
  var resultItem = document.createElement("div");
  resultItem.textContent = "你被分配到：" + group + "組";
  resultContainer.appendChild(resultItem);
}