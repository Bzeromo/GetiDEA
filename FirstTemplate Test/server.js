const express = require('express');
const http = require('http');
const WebSocket = require('ws');

// import express from 'express';
// import http from 'http';
// import WebSocket from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server, maxPayload: 100*1024*1024 });

wss.on('connection', (ws) => {
  console.log('WebSocket 연결이 활성화되었습니다.');

  ws.on('message', (message) => {
    console.log(`받은 메시지: ${message}`);

    // if(ws.readyState === WebSocket.OPEN){

    //     ws.send(message);
    // }

    wss.clients.forEach(client => {
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
  })
});

server.listen(8000, () => {
  console.log('서버가 8000번 포트에서 실행 중입니다.');
});
