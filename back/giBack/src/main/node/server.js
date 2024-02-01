import express from "express";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import axios from "axios";
import { MongoClient } from "mongodb";
import redis from "redis";

// httpServer 인식
const app = express();
const httpServer = createServer(app);

// port 관리 (각각 웹 서비스 포트, 웹 소켓 포트)
const WEB_PORT = 3000;
const SOCKET_PORT = 8000;

const ioServer = new SocketIOServer(httpServer, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:8000", "http://127.0.0.1:8000"],  // 클라이언트 페이지의 URL
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

const uri = "mongodb://test:1234@localhost:27017";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const redisClient = redis.createClient({
    // Docker Compose 서비스 이름을 호스트로 사용
    host: 'redis',
    port: 6379 // 기본 Redis 포트
});

// Redis 연결
redisClient.on('connect', function() {
    console.log('Redis에 연결됨');
});

// Redis 오류 처리
redisClient.on('error', function (err) {
    console.log('오류 ' + err);
});

// locationIds 배열 속에 locationId가 있는 project를 탐색하는 함수
async function findProjectIdByLocationId(locationId) {
    try {
        await client.connect(); // MongoDB 클라이언트 연결
        const database = client.db("test"); // 사용할 데이터베이스 이름
        const projects = database.collection("projects"); // 사용할 컬렉션 이름

        // 주어진 locationId가 locationIds 배열 안에 있는 단 하나의 프로젝트를 검색
        const query = { "locationIds": locationId };
        const project = await projects.findOne(query, { projection: { _id: 0, projectId: 1 } });

        if (project) {
            console.log("Found projectId:", project.projectId);
            return project.projectId; // 찾았으면 프로젝트 Id 반환
        } else {
            console.log("No project found containing the given locationId");
            return null; // 프로젝트를 찾지 못한 경우 null 반환
        }
    } catch (error) {
        console.error("Error finding projectId by locationId:", error);
        return null; // 에러 발생 시 null 반환
    } finally {
        await client.close(); // 사용이 끝난 후 클라이언트 연결 종료
    }
}

// // Spring Boot REST API에서 데이터 가져오기 예시
// app.get('/api/data', async (req, res) => {
//     try {
//         const response = await axios.get('http://localhost:8080/api/endpoint');
//         res.json(response.data);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("API 호출 중 오류 발생");
//     }
// });

ioServer.on('connection', (socket) => {
    console.log('새로운 연결이 감지되었습니다.');

    // 프로젝트 입장 시 locationId를 통해 project 방을 찾아 분류
    socket.on("joinProject", locationId => {
        findProjectIdByLocationId(locationId).then(projectId => {
            if (projectId) {
                console.log(`${projectId} is found.`);
                socket.join(projectId); // projectId에 해당하는 서버 방에 유저가 매핑
            } else {
                console.log("No project found for the specified locationId.");
                socket.emit("redirectToHome", "Project not found");
            }
        }).catch(error => {
            console.error(error);
        });
    })

    // 채팅방 입장 (locationId를 통해 이미 방을 찾아왔음을 가정한다, roomId === projectId)
    socket.on("message", (data) => {
        const { roomId, message } = data; // 클라이언트로부터 방 ID와 메시지를 받습니다.
        ioServer.to(roomId).emit("message", message); // 해당 방의 모든 사용자에게 메시지를 전송합니다.
        console.log(`방 ${roomId}에 메시지를 전송했습니다: ${message}`);
    });

    // 프로젝트 상태 변경사항 공유
    socket.on('updateState', (data) => {
        io.to(data.projectId).emit('stateUpdated', data.newData);
        
        const redisProjectDto = {
            projectId: data.projectId,
            userId: data.userId,
            propId: data.propId,
            preData: JSON.stringify(data.preData),
            newData: JSON.stringify(data.newData)
        };
    
        // Redis에 저장
        redisClient.hset('projects', redisProjectDto.projectId, JSON.stringify(redisProjectDto), (err, reply) => {
            if (err) throw err;
            console.log(reply);
        });
    });

    // 프로젝트 방에서 나가기
    socket.on('leaveProject', async (projectId, locationId) => {
        socket.leave(projectId);
        console.log(`유저가 ${projectId} 프로젝트를 나갔습니다.`);
    
        // redis에 병합 요청 보내기
    });
    
});

axios.get("http://192.168.31.172:8080/data/test/1 ")
.then(data => {
    console.log(data.console.info);
}).catch(err => {
    console.error(err);
})
