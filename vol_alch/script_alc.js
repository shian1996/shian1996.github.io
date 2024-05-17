// 定義抽籤函式
function drawLottery(alcoholPercentage) {
  var result = "";
  
  // 根據不同的酒精濃度分類別進行抽籤
  if (alcoholPercentage <= 10) {
    var options = ["150ml", "300ml", "450ml", "600ml"];
    result = options[Math.floor(Math.random() * options.length)];
  } else if (alcoholPercentage > 10 && alcoholPercentage <= 30) {
    var options = ["100ml", "120ml", "150ml", "200ml"];
    result = options[Math.floor(Math.random() * options.length)];
  } else {
    var options = ["50ml", "100ml", "110ml", "120ml"];
    result = options[Math.floor(Math.random() * options.length)];
  }
  
  return result;
}

// 監聽開始抽籤按鈕的點擊事件
function startDraw() {
  var alcoholPercentage = parseFloat(document.getElementById("alcoholPercentage").value);
  
  // 檢查是否輸入了有效的酒精濃度
  if (isNaN(alcoholPercentage)) {
    alert("請輸入有效的酒精濃度！");
    return;
  }
  
  // 進行抽籤並顯示結果
  var result = drawLottery(alcoholPercentage);
  displayResult(result);
}

// 顯示抽籤結果
function displayResult(result) {
  var resultContainer = document.getElementById("result-container");
  resultContainer.innerHTML = ""; // 清空容器
  
  var resultItem = document.createElement("div");
  resultItem.textContent = "抽籤結果：" + result;
  resultContainer.appendChild(resultItem);
}
