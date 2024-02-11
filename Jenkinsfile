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
                checkout scm
            }
        }

        stage('Prepare Build Files') {
            steps {
                echo 'Downloading build files from Nexus Repository...'
                script {
                    def buildFiles = [
                        'compose.yml',
                        '.env',
                    ]

                    for (file in buildFiles) {
                        withCredentials([usernamePassword(credentialsId: NEXUS_CREDENTIALS_ID, usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                            sh "curl -u \$USERNAME:\$PASSWORD \$NEXUS_URL/repository/\$NEXUS_BACK_REPOSITORY/back/giback/$file -o back/giBack/$file"
                        }
                    }

                    sh 'mkdir -p back/giBack/src/main/resources'

                    withCredentials([usernamePassword(credentialsId: NEXUS_CREDENTIALS_ID, usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh "curl -u \$USERNAME:\$PASSWORD \$NEXUS_URL/repository/\$NEXUS_BACK_REPOSITORY/back/giback/application.yml -o back/giBack/src/main/resources/application.yml"
                    }
                }
            }
        }

        stage('Prepare DB Services') {
            steps {
                echo 'Starting database services...'
                sh 'docker-compose -f back/giBack/compose.yml up -d'
            }
        }

        stage('Check DB Services Health') {
                    steps {
                        script {
                            // Define a helper method to wait for service health
                            def waitForServiceHealth = { service, retries ->
                                def healthy = false
                                for (int i = 0; i < retries; i++) {
                                    sleep 15
                                    healthy = sh(script: "docker inspect --format='{{.State.Health.Status}}' ${service}", returnStdout: true).trim() == 'healthy'
                                    if (healthy) {
                                        break
                                    }
                                }
                                if (!healthy) {
                                    error("Service ${service} did not become healthy after ${retries} retries")
                                }
                            }
                            // Call the helper method for each service
                            waitForServiceHealth('giback_mongodb_1', MAX_RETRIES)
                            waitForServiceHealth('giback_redis_1', MAX_RETRIES)
                            waitForServiceHealth('giback_mysql_1', MAX_RETRIES)
                        }
                    }
                }

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

        stage('Deploy Project') {
            steps {
                echo 'Deploying project...'
                sh 'java -jar "Get idea@4"/back/giBack/build/libs/getidea-0.1.0.jar'
            }
        }
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