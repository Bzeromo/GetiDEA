

import express from "express";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";

const app = express();
const httpServer = createServer(app);

const WEB_PORT = 3000;
const SOCKET_PORT = 8000;

const ioServer = new SocketIOServer(SOCKET_PORT, {
    cors: {
        origin: "http://192.168.31.199:3000",  // 클라이언트 페이지의 URL
        methods: ["GET", "POST"]          // 허용할 HTTP 메소드
    }
});

app.use(express.static("public"));

httpServer.listen(WEB_PORT, () => {
    console.log(`웹 서비스가 ${WEB_PORT}번 포트에서 실행됩니다.`);
});

ioServer.listen(SOCKET_PORT, () => {
    console.log(`웹소켓 서버가 ${SOCKET_PORT}번 포트에서 실행됩니다.`);
});

ioServer.on('connection', (socket) => {
    console.log('새로운 연결이 감지되었습니다.');

    socket.on("message", (data) => {
        ioServer.emit("message", data);
    });

    socket.on('disconnect', () => {
        console.log('연결이 끊어졌습니다.');
    });

    // socket.on('joinProject', (projectId) => {
    //     socket.join(projectId);
    //     console.log(`User joined project ${projectId}`);
    // });

    // // 프로젝트 방에서 나가기
    // socket.on('leaveProject', (projectId) => {
    //     socket.leave(projectId);
    //     console.log(`User left project ${projectId}`);
    // });

    // // 프로젝트 방에 메시지 보내기
    // socket.on('sendMessage', (data) => {
    //     io.to(data.projectId).emit('receiveMessage', data.message);
    // });

    // // 프로젝트 상태 변경사항 공유
    // socket.on('updateState', (data) => {
    //     io.to(data.projectId).emit('stateUpdated', data.newState);
    // });
});
