import express from "express";
import { WebSocketServer } from "ws";
const app = express();

app.use(express.static("public"))

app.listen(3000, () => {
  console.log(`3000번 포트로 서비스가 열렸습니다.`)
})

const wss = new WebSocketServer({ port: 8000 })

wss.broadcast = (message) => {
    wss.clients.forEach((client) => {
      client.send(message);
    });
  };

wss.on("connection", (ws, request) => {
    ws.on("message", (data) => {
        wss.broadcast(data.toString());
    });
    
    ws.on("close", () => {
        wss.broadcast(`유저 한명이 떠났습니다. 현재 유저 ${wss.clients.size} 명`);
    });
    
    wss.broadcast(
        `새로운 유저가 접속했습니다. 현재 유저 ${wss.clients.size} 명`
    );
      
    console.log(`새로운 유저 접속: ${request.socket.remoteAddress}`)
  })

  