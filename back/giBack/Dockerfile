# 1단계: 빌드 환경 설정
FROM azul/zulu-openjdk-alpine:17 as build

# 필요한 도구 설치
RUN apk add --no-cache dos2unix

# 애플리케이션 파일을 저장할 디렉토리 생성
WORKDIR /app

# Gradle Wrapper 파일 및 빌드 스크립트 파일 복사
COPY gradlew /app/
COPY gradle/wrapper/gradle-wrapper.jar /app/gradle/wrapper/
COPY gradle/wrapper/gradle-wrapper.properties /app/gradle/wrapper/
COPY build.gradle /app/
COPY settings.gradle /app/
COPY src /app/src

# 종속성 다운로드 및 애플리케이션 빌드
RUN dos2unix gradlew && chmod +x gradlew && \
    ./gradlew dependencies && \
    ./gradlew build -x test

# 2단계: 실행 환경 설정
FROM azul/zulu-openjdk-alpine:17
WORKDIR /app

# 1단계에서 빌드된 애플리케이션 파일 및 entrypoint.sh 스크립트 복사
COPY --from=build /app/build/libs/getidea-0.1.0.jar /app/app.jar
COPY entrypoint.sh /app/entrypoint.sh

# entrypoint.sh 실행 권한 부여
RUN chmod +x entrypoint.sh

# 포트 8080 열기
EXPOSE 8080

# 애플리케이션 실행
ENTRYPOINT ["/app/entrypoint.sh"]
