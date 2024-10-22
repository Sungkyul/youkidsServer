// server.js 또는 app.js
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 7080; // 서버 포트 설정

// CORS 설정
app.use(cors());

// 정적 파일 서빙 설정
app.use(
  "/files",
  express.static(path.join(__dirname, "src/main/resources/static/files"))
);

// React 애플리케이션 서빙 설정
app.use(express.static(path.join(__dirname, "build")));

// 모든 요청을 React 앱으로 리다이렉트
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
