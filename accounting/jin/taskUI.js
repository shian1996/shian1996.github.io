// 檢查工作密碼
function checkPassword(index) {
    const taskList = JSON.parse(localStorage.getItem("tasks"));
    const enteredPassword = document.getElementById(`task-password-${index}`).value;
    const task = taskList[index];

    if (enteredPassword === task.password) {
        document.getElementById(`task-remarks-${index}`).style.display = "block"; // 顯示備註
        document.getElementById(`password-error-${index}`).style.display = "none"; // 隱藏錯誤訊息
        document.getElementById(`complete-task-${index}`).disabled = false; // 允許勾選完成
    } else {
        document.getElementById(`password-error-${index}`).style.display = "block"; // 顯示錯誤訊息
        document.getElementById(`task-remarks-${index}`).style.display = "none"; // 隱藏備註
        document.getElementById(`complete-task-${index}`).disabled = true; // 禁止勾選
    }
}

// 勾選工作完成
function toggleTaskCompletion(index) {
    const taskList = JSON.parse(localStorage.getItem("tasks"));
    taskList[index].completed = document.getElementById(`complete-task-${index}`).checked;
    localStorage.setItem("tasks", JSON.stringify(taskList));
}
