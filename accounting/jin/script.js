// 登入的帳號與密碼
const validUsername = "jin";
const validPassword = "jin0909";

// 檢查是否已登入
document.addEventListener("DOMContentLoaded", function() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        document.getElementById("login-container").style.display = "none";
        document.getElementById("task-input").style.display = "block";
        document.getElementById("logout-btn").style.display = "inline-block";  // 顯示登出按鈕
    } else {
        document.getElementById("login-container").style.display = "block";
        document.getElementById("task-input").style.display = "none";
        document.getElementById("logout-btn").style.display = "none";  // 隱藏登出按鈕
    }
    loadTasks();
});

// 登入功能
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    if (username === validUsername && password === validPassword) {
        localStorage.setItem("loggedInUser", username);
        document.getElementById("login-container").style.display = "none";
        document.getElementById("task-input").style.display = "block";
        document.getElementById("logout-btn").style.display = "inline-block";
        loadTasks();
    } else {
        errorMessage.style.display = "block";
    }
}

// 登出
function logout() {
    localStorage.removeItem("loggedInUser");
    document.getElementById("login-container").style.display = "block";
    document.getElementById("task-input").style.display = "none";
    document.getElementById("logout-btn").style.display = "none";
}

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

        // 這裡繼續渲染其他內容
        taskItem.innerHTML += `
            <h4>${task.name}</h4>
            <p>指派給：${task.assignee}</p>
            <p>截止日期：${task.deadline}</p>
            <input type="password" id="task-password-${index}" placeholder="輸入工作密碼" />
            <button onclick="checkPassword(${index})">查看備註</button>
            <p class="password-error" id="password-error-${index}" style="display: none;">工作密碼錯誤</p>
            <p id="task-remarks-${index}" style="display: none;">備註：${task.remarks || "無"}</p>
            <input type="checkbox" id="complete-task-${index}" onclick="toggleTaskCompletion(${index})" ${task.completed ? "checked" : ""} />
            <label for="complete-task-${index}">工作完成</label>
            <button class="remove-btn" onclick="removeTask(${index})">刪除工作</button>
        `;
        
        // 如果工作完成，顯示綠色背景
        if (task.completed) {
            taskItem.style.backgroundColor = "#d4edda"; // 綠色背景
        }

        taskListContainer.appendChild(taskItem);
    });
}

// 檢查工作密碼
function checkPassword(index) {
    const taskList = JSON.parse(localStorage.getItem("tasks"));
    const enteredPassword = document.getElementById(`task-password-${index}`).value;
    const task = taskList[index];

    if (enteredPassword === task.password) {
        document.getElementById(`task-remarks-${index}`).style.display = "block"; // 顯示備註
        document.getElementById(`password-error-${index}`).style.display = "none"; // 隱藏錯誤訊息
    } else {
        document.getElementById(`password-error-${index}`).style.display = "block"; // 顯示錯誤訊息
        document.getElementById(`task-remarks-${index}`).style.display = "none"; // 隱藏備註
    }
}

// 勾選工作完成
function toggleTaskCompletion(index) {
    const taskList = JSON.parse(localStorage.getItem("tasks"));
    taskList[index].completed = document.getElementById(`complete-task-${index}`).checked;
    localStorage.setItem("tasks", JSON.stringify(taskList));
    loadTasks();
}

// 新增工作
function addTask() {
    const taskName = document.getElementById("new-task").value;
    const deadline = document.getElementById("task-deadline").value;
    const assignee = document.getElementById("assignee").value;
    const password = document.getElementById("task-password").value;
    const remarks = document.getElementById("remarks").value;

    if (taskName && deadline && assignee && password) {
        const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.push({
            name: taskName,
            deadline: deadline,
            assignee: assignee,
            password: password,
            remarks: remarks,
            completed: false
        });
        localStorage.setItem("tasks", JSON.stringify(taskList));
        loadTasks();

        // 清空輸入欄位
        document.getElementById("new-task").value = '';
        document.getElementById("task-deadline").value = '';
        document.getElementById("assignee").value = '';
        document.getElementById("task-password").value = '';
        document.getElementById("remarks").value = '';
    } else {
        alert("請填寫所有必填欄位！");
    }
}

// 刪除工作
function removeTask(index) {
    const taskList = JSON.parse(localStorage.getItem("tasks"));
    taskList.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    loadTasks();
}

// 修改 loadTasks 函數，從伺服器讀取資料
async function loadTasks() {
    const response = await fetch('http://localhost:3000/tasks');
    const tasks = await response.json();
    const taskListContainer = document.getElementById("task-list");
    taskListContainer.innerHTML = "";  // 清空清單

    tasks.forEach((task, index) => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");

        taskItem.innerHTML = `
            <h4>${task.name}</h4>
            <p>指派給：${task.assignee}</p>
            <p>截止日期：${task.deadline}</p>
            <button onclick="checkPassword(${index})">查看備註</button>
        `;

        taskListContainer.appendChild(taskItem);
    });
}

// 修改 addTask 函數，將資料發送到伺服器
async function addTask() {
    const taskName = document.getElementById("new-task").value;
    const deadline = document.getElementById("task-deadline").value;
    const assignee = document.getElementById("assignee").value;
    const password = document.getElementById("task-password").value;
    const remarks = document.getElementById("remarks").value;

    if (taskName && deadline && assignee && password) {
        const newTask = {
            name: taskName,
            deadline: deadline,
            assignee: assignee,
            password: password,
            remarks: remarks,
            completed: false
        };

        const response = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        });

        const task = await response.json();
        loadTasks();  // 重新加載工作清單
    } else {
        alert("請填寫所有必填欄位！");
    }
}

