# Azul Zulu 17 버전의 JDK를 사용하는 베이스 이미지 선택
FROM azul/zulu-openjdk-alpine:17

# 애플리케이션 파일을 저장할 디렉토리 생성
WORKDIR /app

# Gradle Wrapper를 이용하여 빌드할 수 있도록 필요한 파일 복사
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src

# 애플리케이션 빌드
RUN ./gradlew build

# 빌드 결과물인 jar 파일을 애플리케이션 디렉토리로 복사
RUN mv build/libs/*.jar app.jar

# 임시 파일 및 빌드 스크립트 제거
RUN rm -rf ./gradle ./gradlew ./build.gradle ./settings.gradle ./src

# 포트 8080 열기
EXPOSE 8080

# 애플리케이션 실행
ENTRYPOINT ["java", "-jar", "app.jar"]
