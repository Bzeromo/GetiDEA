const express = require("express");
const bodyParser = require("body-parser");
const path = require("path"); // path 모듈 추가
const { OpenVidu } = require("openvidu-node-client");

const app = express(); // app 인스턴스를 한 번만 선언
const port = process.env.PORT || 3000;
const openviduUrl = "https://localhost:4443";
const openviduSecret = "MY_SECRET";

app.use(bodyParser.json());

// OpenVidu 인스턴스 생성
const OV = new OpenVidu(openviduUrl, openviduSecret);

// 세션 생성을 위한 엔드포인트
app.post("/session", async (req, res) => {
  try {
    const session = await OV.createSession();
    const connection = await session.createConnection(); // Connection 객체 생성
    const token = connection.token; // Connection 객체에서 토큰 얻기

    res.send({ sessionId: session.sessionId, token: token });
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    res.status(500).send("Server error");
  }
});

// 정적 파일 제공 설정 (React 앱 빌드 폴더 지정)
app.use(express.static(path.join(__dirname, "build")));

// 모든 GET 요청을 index.html로 리다이렉트
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
