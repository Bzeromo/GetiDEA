pipeline {
    agent any

    // 환경 변수 정의, 빌드에 필요한 변수나 API 키 등을 설정
     environment {
         gitlabApiUrl = "https://lab.ssafy.com/s10-webmobile1-sub2/S10P12B104"
         gitlabToken = "uFYe7ypyNaGQz3nKxBuY"
         NEXUS_URL = 'http://43.202.42.142:8081'
         NEXUS_BACK_REPOSITORY = 'backBuild'
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
                    def buildFiles = [
                        'compose.yml',
                        'init-mongo.js',
                        'init-mysql.sql',
                        '.env',
                        'redis.conf',
                        'entrypoint.sh'
                    ]

                    sh 'mkdir -p back/giBack'

                    for (file in buildFiles) {
                        withCredentials([usernamePassword(credentialsId: NEXUS_CREDENTIALS_ID, usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                            sh "curl -u \$USERNAME:\$PASSWORD \$NEXUS_URL/repository/\$NEXUS_BACK_REPOSITORY/back/giback/$file -o back/giBack/$file"
                        }
                    }

                    sh 'mkdir -p back/giBack/src/main/resource'

                    withCredentials([usernamePassword(credentialsId: NEXUS_CREDENTIALS_ID, usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh "curl -u \$USERNAME:\$PASSWORD \$NEXUS_URL/repository/\$NEXUS_BACK_REPOSITORY/back/giback/application.yml -o back/giBack/src/main/resource/application.yml"
                    }
                }
            }
        }

         stage('Build and Test backend') {
            steps {
                script {
                    echo 'Building and testing backend branch...'
                    sh 'docker-compose -f back/giBack/compose.yml up -d --build'
                }
            }
            post {
                always {
                    echo 'Stopping Docker Compose services...'
                    sh 'docker-compose -f back/giBack/compose.yml down'
                }
            }
        }

          stage('Deploy to Main') {
            steps {
                echo 'Deploying main branch...'
                sh 'docker-compose -f back/giBack/compose.yml up -d --build'
            }
          }

//      stage('Upload Artifacts to Nexus') {
//             when {
//                 branch 'back'
//             }
//             steps {
//                 script {
//                     // 백엔드 아티팩트 업로드
//                     nexusArtifactUploader(
//                         nexusVersion: 'nexus3',
//                         protocol: 'http',
//                         nexusUrl: NEXUS_URL,
//                         groupId: 'your.group',
//                         version: '1.0.0',
//                         repository: NEXUS_REPOSITORY,
//                         credentialsId: NEXUS_CREDENTIALS_ID,
//                         artifacts: [
//                             [artifactId: 'your-artifact-id',
//                              classifier: '',
//                              file: 'path/to/your/artifact/file.jar',
//                              type: 'jar']
//                             // 추가적인 아티팩트를 업로드하려면 여기에 추가
//                         ]
//                     )
//                 }
//             }
//         }
//     }
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