#!/bin/bash

# MongoDB 준비 상태 확인
until mongo --username user1 --password 1234 --host mongodb --eval "print('waited for mongodb')" &> /dev/null; do
  echo "Waiting for MongoDB to be ready..."
  sleep 5
done
echo "MongoDB is ready."

# MySQL 준비 상태 확인
until mysqladmin ping -h"mysql" --silent; do
  echo "Waiting for MySQL to be ready..."
  sleep 5
done
echo "MySQL is ready."

# Redis 준비 상태 확인
until redis-cli -h redis ping | grep -q "PONG"; do
  echo "Waiting for Redis to be ready..."
  sleep 5
done
echo "Redis is ready."

# 모든 서비스가 준비되면 Spring Boot 애플리케이션을 실행
java -jar app.jar