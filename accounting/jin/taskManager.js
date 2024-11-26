// 加載工作清單
function loadTasks() {
    const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskListContainer = document.getElementById("task-list");
    taskListContainer.innerHTML = "";  // 清空清單

    taskList.forEach((task, index) => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");

        // 計算距離截止日期的天數
        const deadlineDate = new Date(task.deadline);
        const currentDate = new Date();
        const timeDiff = deadlineDate - currentDate;
        const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

        // 設定任務背景顏色及提示訊息
        if (daysLeft <= 1) {
            taskItem.style.backgroundColor = "#f8d7da"; // 紅色背景
            taskItem.innerHTML += `<p>要到期啦! 請盡速完成!</p>`;
        } else if (daysLeft <= 3) {
            taskItem.style.backgroundColor = "#fff3cd"; // 黃色背景
            taskItem.innerHTML += `<p>加緊腳步囉!!!!</p>`;
        } else {
            taskItem.style.backgroundColor = "#ffffff"; // 默認白色背景
        }

        taskItem.innerHTML += `
            <h4>${task.name}</h4>
            <p>指派給：${task.assignee}</p>
            <p>截止日期：${task.deadline}</p>
            <input type="password" id="task-password-${index}" placeholder="輸入工作密碼" />
            <button onclick="checkPassword(${index})">查看備註</button>
            <p class="password-error" id="password-error-${index}" style="display: none;">工作密碼錯誤</p>
            <p id="task-remarks-${index}" style="display: none;">備註：${task.remarks || "無"}</p>
            <input type="checkbox" id="complete-task-${index}" onclick="toggleTaskCompletion(${index})" ${task.completed ? "checked" : ""} disabled />
            <label for="complete-task-${index}">工作完成</label>
            <button class="remove-btn" onclick="removeTask(${index})" ${localStorage.getItem('loggedInUser') !== validUsername ? 'style="display:none"' : ''}>刪除工作</button>
        `;

        // 如果工作完成，顯示綠色背景
        if (task.completed) {
            taskItem.style.backgroundColor = "#d4edda"; // 綠色背景
        }

        taskListContainer.appendChild(taskItem);
    });
}

// 新增工作
function addTask() {
    const taskName = document.getElementById("new-task").value;
    const deadline = document.getElementById("task-deadline").value;
    const assignee = document.getElementById("assignee").value;
    const password = document.getElementById("task-password").value;
    const remark = document.getElementById("remarks").value; // 取得備註內容

    if (taskName && deadline && assignee && password) {
        const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.push({
            name: taskName,
            deadline: deadline,
            assignee: assignee,
            password: password,
            remarks: remark, // 儲存備註內容
            completed: false
        });
        localStorage.setItem("tasks", JSON.stringify(taskList));
        loadTasks();
        // 清空輸入框
        document.getElementById("new-task").value = '';
        document.getElementById("task-deadline").value = '';
        document.getElementById("assignee").value = '';
        document.getElementById("task-password").value = '';
        document.getElementById("remarks").value = '';
    } else {
        alert("請填寫完整的工作資訊！");
    }
}

// 刪除工作
function removeTask(index) {
    const taskList = JSON.parse(localStorage.getItem("tasks"));
    taskList.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    loadTasks();
}
