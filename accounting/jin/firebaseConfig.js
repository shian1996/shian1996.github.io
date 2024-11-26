// 用你在 Firebase 控制台取得的設定初始化 Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",  // 替換為你的 API 金鑰
  authDomain: "YOUR_AUTH_DOMAIN",  // 替換為你的認證域名
  projectId: "YOUR_PROJECT_ID",  // 替換為你的專案 ID
  storageBucket: "YOUR_STORAGE_BUCKET",  // 替換為你的存儲桶
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",  // 替換為你的發送 ID
  appId: "YOUR_APP_ID",  // 替換為你的應用 ID
  measurementId: "YOUR_MEASUREMENT_ID"  // 如果有，請替換為你的測量 ID
};

// 初始化 Firebase
const app = firebase.initializeApp(firebaseConfig);

// 如果你使用 Firestore
const db = firebase.firestore(app);
