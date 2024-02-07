# 1단계: 빌드 환경 설정
# Azul Zulu 17 버전의 JDK를 사용하는 베이스 이미지 선택
FROM azul/zulu-openjdk-alpine:17 as build

# 필요한 도구 설치
RUN apk add --no-cache dos2unix

# 애플리케이션 파일을 저장할 디렉토리 생성
WORKDIR /app

# Gradle Wrapper 파일 복사
COPY gradlew .
COPY gradle gradle

# 빌드 스크립트 파일 복사
COPY build.gradle .
COPY settings.gradle .

# 종속성 다운로드를 위해 빌드 스크립트 파일만 먼저 복사하고 종속성 해결
RUN dos2unix gradlew && chmod +x gradlew
RUN ./gradlew dependencies

# 소스 코드 복사
COPY src src

# 애플리케이션 빌드
RUN ./gradlew build -x test

# 2단계: 실행 환경 설정
FROM azul/zulu-openjdk-alpine:17

WORKDIR /app

# 1단계에서 빌드된 애플리케이션 파일을 현재 스테이지로 복사
COPY --from=build /app/build/libs/*.jar app.jar

# entrypoint.sh 스크립트 복사
COPY entrypoint.sh entrypoint.sh
RUN chmod +x entrypoint.sh

# 포트 8080 열기
EXPOSE 8080

# 애플리케이션 실행
ENTRYPOINT ["./entrypoint.sh"]