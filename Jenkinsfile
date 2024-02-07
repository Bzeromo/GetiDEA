pipeline {
    agent any

    // 환경 변수 정의, 빌드에 필요한 변수나 API 키 등을 설정
    environment {
        def gitlabApiUrl = "https://lab.ssafy.com/s10-webmobile1-sub2/S10P12B104"
        def gitlabToken = "uFYe7ypyNaGQz3nKxBuY"
        NEXUS_URL = 'http://43.202.42.142:8081/'
        NEXUS_REPOSITORY = 'your-repository' // 찾아서 파야됨
        NEXUS_CREDENTIALS_ID = 'getIdeaNexus'
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
                    // Nexus Repository로부터 필요한 파일들을 다운로드
                    def buildFiles = [
                        'docker-compose.yml',
                        'init-mongo.js',
                        'init-mysql.sql',
                        // 필요한 다른 파일들을 여기에 추가
                    ]

                    for (file in buildFiles) {
                        withCredentials([usernamePassword(credentialsId: NEXUS_CREDENTIALS_ID, usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                            sh "curl -u $USERNAME:$PASSWORD $NEXUS_URL/repository/$NEXUS_REPOSITORY/back/giback/${file} -o back/giback/${file}"
                        }
                    }
                }
            }
        }


        stage('Build and Test Back') {
            when {
                branch 'back'
            }
            steps {
                echo 'Building and testing back branch...'
                // Docker Compose
                // Jenkins 작업자에게 Docker 명령을 실행할 수 있는 권한 부여
                sh 'docker-compose -f back/giback/compose.yml up -d --build'
                // 테스트 스크립트 추가
                // 예: sh 'docker-compose -f back/giback/compose.yml exec app ./gradlew test'
            }
            post {
                always {
                    // Docker Compose를 사용하여 서비스를 종료 (테스트)
                    echo 'Stopping Docker Compose services...'
                    sh 'docker-compose -f back/giback/compose.yml down'
                }
            }
        }

//           stage('Deploy to Main') {
//                     when {
//                         branch 'main'
//                     }
//                     steps {
//                         echo 'Deploying main branch...'
//                         // 메인 브랜치에 대한 배포 스크립트를 실행
//                         // 배포 환경에 따라 적절한 배포 명령을 추가
//                         // sh 'docker-compose -f back/giback/compose.yml up -d --build'
//                         // sh 'docker-compose -f back/giback/compose.yml run app ./deploy-script.sh'
//                     }
//           }

     stage('Upload Artifacts to Nexus') {
            when {
                branch 'back'
            }
            steps {
                script {
                    // 백엔드 아티팩트 업로드
                    nexusArtifactUploader(
                        nexusVersion: 'nexus3',
                        protocol: 'http',
                        nexusUrl: NEXUS_URL,
                        groupId: 'your.group',
                        version: '1.0.0',
                        repository: NEXUS_REPOSITORY,
                        credentialsId: NEXUS_CREDENTIALS_ID,
                        artifacts: [
                            [artifactId: 'your-artifact-id',
                             classifier: '',
                             file: 'path/to/your/artifact/file.jar',
                             type: 'jar']
                            // 추가적인 아티팩트를 업로드하려면 여기에 추가
                        ]
                    )
                }
            }
        }
    }

    post {
        always {
            // 항상 실행되는 단계, 청소 단계
            echo 'Cleaning up...'
            sh 'docker-compose -f back/giback/compose.yml down --volumes --remove-orphans'
            sh 'docker system prune -af'
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
