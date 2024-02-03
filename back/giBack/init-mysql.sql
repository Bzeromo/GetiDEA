-- 'test' 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS test;

-- 'test' 데이터베이스 사용 설정
USE test;

-- 'test' 데이터베이스에 대한 'user1' 사용자 생성 및 권한 부여
CREATE USER 'user1'@'%' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON test.* TO 'user1'@'%';
FLUSH PRIVILEGES;

-- 'test' 데이터베이스에 대한 'readonlyuser' 사용자 생성 및 읽기 권한 부여
CREATE USER 'readonlyuser'@'%' IDENTIFIED BY 'readonlypass';
GRANT SELECT ON test.* TO 'readonlyuser'@'%';
FLUSH PRIVILEGES;

-- users 테이블
CREATE TABLE `users` (
     `userId` VARCHAR(30) NOT NULL,
     `isAdmin` TINYINT(1) NOT NULL,
     `email` VARCHAR(50) NOT NULL,
     `profileImg` VARCHAR(256),
     `userName` VARCHAR(24) NOT NULL,
     `provider` VARCHAR(10) NOT NULL,
     `accessToken` VARCHAR(256),
     PRIMARY KEY (`userId`)
);

-- folders 테이블
CREATE TABLE `folders` (
    `folderId` INT NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(30) NOT NULL,
    `folderName` VARCHAR(30),
    PRIMARY KEY (`folderId`),
    FOREIGN KEY (`userId`) REFERENCES `users`(`userId`)
);

--folder 확인용 더미데이터 추가

INSERT INTO folders (userId, userId, folderName)
VALUES
    ('test1', 'hs', 'Folder A'),
    ('test2', 'hs', 'Folder B'),
    ('test3', 'hs', 'Folder C');

-- locations 테이블
CREATE TABLE `locations` (
    `locationId` VARCHAR(30) NOT NULL,
    `folderId` INT,
    `userId` VARCHAR(30) NOT NULL,
    `projectId` VARCHAR(30),
    `authority` INT,
    `bookmark` BOOLEAN NOT NULL,
    PRIMARY KEY (`locationId`),
    FOREIGN KEY (`folderId`) REFERENCES `folders`(`folderId`),
    FOREIGN KEY (`userId`) REFERENCES `users`(`userId`)
);