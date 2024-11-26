const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// 創建 Express 應用
const app = express();
const port = 3000;

// 解析 JSON 格式的請求
app.use(bodyParser.json());

// 靜態文件伺服器：提供靜態檔案，如 HTML、CSS、JS
app.use(express.static('public'));

// 連接到 MongoDB 資料庫
mongoose.connect('mongodb://localhost:27017/taskdb', { useNewUrlParser: true, useUnifiedTopology: true });

// 定義工作資料結構
const taskSchema = new mongoose.Schema({
    name: String,
    deadline: String,
    assignee: String,
    password: String,
    remarks: String,
    completed: Boolean
});

// 創建工作模型
const Task = mongoose.model('Task', taskSchema);

// API：獲取所有工作
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// API：新增工作
app.post('/api/tasks', async (req, res) => {
    const { name, deadline, assignee, password, remarks } = req.body;
    const task = new Task({ name, deadline, assignee, password, remarks, completed: false });

    try {
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).send('Error saving task');
    }
});

// 啟動伺服器
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
