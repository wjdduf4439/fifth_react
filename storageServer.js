// storageServer.js
const express = require('express');
const path = require('path');
const app = express();

// D:\fifth_storage\template 경로의 파일을 정적 파일로 제공
app.use('/images', express.static('D:/fifth_storage/template'));

// 서버 시작
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});