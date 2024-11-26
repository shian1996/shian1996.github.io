// 登入的帳號與密碼
const validUsername = "jin";
const validPassword = "jin0909";

// 這裡會新增一個工作者登入驗證
const validWorkers = ["shian"];  // 這裡加入所有允許的工作者

// 初始化 Firebase Auth
const auth = firebase.auth();

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
    } else if (validWorkers.includes(username) && password === validPassword) {
        // 如果是工作者，並且密碼正確
        localStorage.setItem("loggedInUser", username);
        document.getElementById("login-container").style.display = "none";
        document.getElementById("task-input").style.display = "none"; // 隱藏工作指派區
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
