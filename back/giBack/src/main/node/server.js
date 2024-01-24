import express from "express";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import axios from 'axios';

// httpServer 인식
const app = express();
const httpServer = createServer(app);

// port 관리 (각각 웹 서비스 포트, 웹 소켓 포트)
const WEB_PORT = 3000;
const SOCKET_PORT = 8000;

const ioServer = new SocketIOServer(httpServer, {
    cors: {
        origin: "http://localhost:3000",  // 클라이언트 페이지의 URL
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

    // mongo db 연동 후, REST API를 이용해 db 내 데이터를 가져오면 작동 가능
    // // 소켓과 프로젝트가 연결되었을 때
    // socket.on('joinProject', async (projectId, userId) => {
    //     socket.join(projectId);
    //     console.log(`User joined project ${projectId}`);
    //
    //     // 스프링 서비스의 REST API 호출
    //     try {
    //          await axios.post('http://localhost:8080/api/joinProject', { projectId, userId });
    //          console.log(`User ${userId} joined project ${projectId}`);
    //     } catch (error) {
    //          console.error('joinProject API 호출 중 오류 발생:', error);
    //     }
    //
    //     // 나머지 로직
    // });
    //
    // // 프로젝트 방에서 나가기
    // socket.on('leaveProject', async (projectId, userId) => {
    //     socket.leave(projectId);
    //     console.log(`User left project ${projectId}`);
    //
    //     // 스프링 서비스의 REST API 호출
    //     try {
    //          await axios.post('http://localhost:8080/api/leaveProject', { projectId, userId });
    //          console.log(`User ${userId} left project ${projectId}`);
    //      } catch (error) {
    //          console.error('leaveProject API 호출 중 오류 발생:', error);
    //      }
    //
    //     // 나머지 로직...
    // });
    //
    // // 프로젝트 방에 메시지 보내기
    // socket.on('sendMessage', (data) => {
    //     io.to(data.projectId).emit('receiveMessage', data.message);
    // });
    //
    // // 프로젝트 상태 변경사항 공유
    // socket.on('updateState', (data) => {
    //     io.to(data.projectId).emit('stateUpdated', data.newState);
    // });
});

