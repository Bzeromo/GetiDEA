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