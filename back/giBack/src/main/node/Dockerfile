FROM node:14

# 앱 디렉토리 생성
WORKDIR /usr/src/server

# 앱 의존성 설치
COPY package*.json ./
RUN npm install

# 앱 소스 추가
COPY . .

EXPOSE 3000
CMD ["node", "server.js"]
