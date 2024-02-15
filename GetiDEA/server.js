const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server, maxPayload: 100*1024*1024 });

// 프로젝트별 클라이언트 관리를 위한 객체
const projectClients = {};

wss.on('connection', (ws) => {
  console.log('WebSocket 연결이 활성화되었습니다.');

  ws.on('message', (message) => {
    console.log(`받은 메시지: ${message}`);
    const parsedMessage = JSON.parse(message);
    const projectId = parsedMessage.projectId;

    console.log(projectId + "이거 프로젝트 아이디인데 보이냐?")

    // 해당 클라이언트를 프로젝트별로 관리
    if (!projectClients[projectId]) {
      projectClients[projectId] = new Set();
    }
    projectClients[projectId].add(ws);

    // 프로젝트에 속한 클라이언트에게 메시지 전송
    projectClients[projectId].forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
        console.log("메시지를 보냈습니다.")
      }
    });
  });

  ws.on('error', error => {
    console.error('WebSocket 오류 발생:', error);
  });

  ws.on('close', function close(code, reason){
    console.log(`연결이 닫혔습니다. 코드 : ${code}, 이유: ${reason}`)
    // 연결이 닫힌 클라이언트를 해당 프로젝트에서 제거
    Object.keys(projectClients).forEach(projectId => {
      projectClients[projectId].delete(ws);
    });
  })
});

server.listen(8000, () => {
  console.log('서버가 8000번 포트에서 실행 중입니다.');
});
