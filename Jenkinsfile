pipeline {
    agent any

    // 환경 변수 정의, 빌드에 필요한 변수나 API 키 등을 설정
     environment {
         gitlabApiUrl = "https://lab.ssafy.com/s10-webmobile1-sub2/S10P12B104"
         gitlabToken = "uFYe7ypyNaGQz3nKxBuY"
         NEXUS_URL = 'http://43.202.42.142:8081'
         NEXUS_BACK_REPOSITORY = 'backBuild'
         NEXUS_CREDENTIALS_ID = 'getIdeaNexus'
         MAX_RETRIES = 5
     }

    stages {
        stage('Checkout') {
            steps {
                // 현재 파이프라인이 실행된 브랜치에 따라 소스 코드를 체크아웃
                echo 'Checking out code...'
                sh 'whoami'
                checkout scm
            }
        }

        stage('Prepare Build Files') {
            steps {
                echo 'Downloading build files from Nexus Repository...'
                script {
                    withCredentials([usernamePassword(credentialsId: NEXUS_CREDENTIALS_ID, usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh "curl -u \$USERNAME:\$PASSWORD \$NEXUS_URL/repository/\$NEXUS_BACK_REPOSITORY/front/gifront/.env -o GetiDEA_front/.env"
                    }

                    withCredentials([usernamePassword(credentialsId: NEXUS_CREDENTIALS_ID, usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh "curl -u \$USERNAME:\$PASSWORD \$NEXUS_URL/repository/\$NEXUS_BACK_REPOSITORY/back/giback/compose.yml -o back/giBack/compose.yml"
                    }

                    sh 'mkdir -p back/giBack/src/main/resources'

                    withCredentials([usernamePassword(credentialsId: NEXUS_CREDENTIALS_ID, usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh "curl -u \$USERNAME:\$PASSWORD \$NEXUS_URL/repository/\$NEXUS_BACK_REPOSITORY/back/giback/application.yml -o back/giBack/src/main/resources/application.yml"
                    }
                }
            }
        }

//         stage('Prepare DB Services') {
//             steps {
//                 echo 'Starting database services...'
//                 sh 'docker-compose -f back/giBack/compose.yml up -d'
//             }
//         }
//
//         stage('Check DB Services Health') {
//                     steps {
//                         script {
//                             // Define a helper method to wait for service health
//                             def waitForServiceHealth = { service, retries ->
//                                 def healthy = false
//                                 for (int i = 0; i < retries; i++) {
//                                     sleep 15
//                                     healthy = sh(script: "docker inspect --format='{{.State.Health.Status}}' ${service}", returnStdout: true).trim() == 'healthy'
//                                     if (healthy) {
//                                         break
//                                     }
//                                 }
//                                 if (!healthy) {
//                                     error("Service ${service} did not become healthy after ${retries} retries")
//                                 }
//                             }
//                             // Call the helper method for each service
//                             waitForServiceHealth('giback_mongodb_1', MAX_RETRIES)
//                             waitForServiceHealth('giback_redis_1', MAX_RETRIES)
//                             waitForServiceHealth('giback_mysql_1', MAX_RETRIES)
//                         }
//                     }
//                 }

        stage('Build Project') {
            steps {
                echo 'Building project...'
                dir('back/giBack') {
                    // 실행 권한 부여
                    sh 'chmod +x gradlew'
                    // 빌드 실행
                    sh './gradlew build -x test'
                }
            }
        }
//
        stage('Deploy Back Server') {
            steps {
                echo 'Deploying project...'
                dir('back/giBack/build/') {
//                     // 실행 권한 부여
//                     sh 'chmod +x libs'
//                     // 빌드 실행
//                     sh 'java -jar libs/getidea-0.1.0.jar'
                       sh 'whoami'
                }
            }
        }

        stage('Build Frontend') {
            steps {
//                 script {
//                     sh '''
//                     export NVM_DIR="$HOME/.nvm"
//                     [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
//                     nvm use 21.6.1
//                     '''
//                 }
                echo 'Building frontend...'
                dir('/front') {
                    // 의존성 설치
//                     sh 'yarn install'
//                     sh 'yarn start'
                       sh 'whoami'
                }
            }
        }

//         stage('Deploy Frontend') {
//             steps {
//                 echo 'Deploying frontend...'
//                 // 프론트엔드 빌드 결과물을 호스팅하는 서버에 배포합니다.
//                 // 이 예시에서는 단순히 파일을 복사하는 것으로 가정합니다.
//                 // 실제로는 웹 서버 디렉토리로 파일을 복사하거나, 별도의 배포 스크립트를 실행해야 할 수 있습니다.
//                 // sh 'cp -R /home/jenkins/workspace/Getidea/front/build/* /path/to/web/server/directory'
//                 dir('/front') {
//                     // 프로덕션 빌드 생성
//                     sh 'yarn start'
//                 }
//             }
//         }
    }

    post {
        always {
            // 항상 실행되는 단계, 청소 단계
            echo 'Cleaning up...'
        }

        success {
            // 파이프라인 실행이 성공했을 때 실행
            echo 'Pipeline completed successfully!'
        }

        failure {
            // 파이프라인 실행이 실패했을 때 실행
            echo 'Pipeline failed!'
        }
    }
}