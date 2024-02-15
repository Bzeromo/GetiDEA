const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;
const cors = require('cors');

// `users` 배열을 전역으로 정의

const corsOptions = {
  allowedHeaders: ['Content-Type', 'Authorization'], // 클라이언트에서 보낼 수 있는 헤더 목록
  origin: '*', // 모든 도메인에서의 요청을 허용
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 허용할 HTTP 메소드
  preflightContinue: false, // CORS pre-flight 요청에 대해 라우트로 전달하지 않음
  optionsSuccessStatus: 204 // 브라우저에게 성공 상태 코드로 204를 반환
};

let users = []; // 사용자 정보를 저장할 메모리 저장소
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(express.json()); // body-parser 대신 사용

// 사용자 정보를 저장할 메모리 저장소
app.post('/register', (req, res) => {
  const { peerId, projectId } = req.body;
  console.log(req.body); // 요청 본문 로깅
  const existingUser = users.find(user => user.peerId === peerId && user.projectId === projectId);
  if (!existingUser) {
      users.push({ peerId, projectId });
      res.send({ success: true, peerId, projectId });
  } else {
      res.status(400).send({ success: false, message: 'User already exists.' });
  }
});

app.get('/users/:projectId', (req, res) => {
  const projectId = req.params.projectId; // 문자열로 받아옴
  console.log(projectId + " 프로젝트 아이디");
  // projectId 타입에 따라 비교 방식 조정이 필요할 수 있음
  const projectUsers = users.filter(user => user.projectId.toString() === projectId); // 명시적으로 타입 변환
  console.log("users", users);
  console.log("projectUsers", projectUsers);
  res.send(projectUsers);
});

// 사용자 삭제 엔드포인트
app.post('/unregister', (req, res) => { // DELETE 대신 POST 사용
  const { peerId, projectId } = req.body;
  // 사용자 삭제 로직
  res.send({ success: true, peerId, projectId, message: 'User unregistered successfully.' });
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});