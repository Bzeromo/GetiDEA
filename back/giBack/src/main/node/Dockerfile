FROM node:14

# 앱 디렉토리 생성
<<<<<<< HEAD
WORKDIR /usr/src/server
=======
WORKDIR /usr/src/app
>>>>>>> 47b6bbe684437ae6db6a9c3d34870852955fa39e

# 앱 의존성 설치
COPY package*.json ./
RUN npm install

# 앱 소스 추가
COPY . .

EXPOSE 3000
<<<<<<< HEAD
CMD ["node", "server.js"]
=======
CMD ["node", "app.js"]
>>>>>>> 47b6bbe684437ae6db6a9c3d34870852955fa39e
