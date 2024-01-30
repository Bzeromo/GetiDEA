pipeline {
    agent any

    // 환경 변수를 정의할 수 있습니다. 예를 들어, 빌드에 필요한 변수나 API 키 등을 설정할 수 있습니다.
    environment {
        // 예: MY_ENV_VAR = 'some_value'
    }

    stages {
        stage('Checkout') {
            steps {
                // 현재 파이프라인이 실행된 브랜치에 따라 소스 코드를 체크아웃합니다.
                checkout scm
            }
        }

        stage('Build and Test Main') {
            when {
                branch 'main'
            }
            steps {
                echo 'Building and testing main branch...'
                // main 브랜치에 대한 빌드와 테스트 스크립트를 실행합니다.
                // 예: sh 'make build && make test'
            }
        }

        stage('Build and Test Frontend') {
            when {
                branch 'frontend'
            }
            steps {
                echo 'Building and testing frontend branch...'
                // frontend 브랜치에 대한 빌드와 테스트 스크립트를 실행합니다.
                // 예: sh 'npm install && npm test'
            }
        }

        stage('Build and Test Backend') {
            when {
                branch 'backend'
            }
            steps {
                echo 'Building and testing backend branch...'
                // backend 브랜치에 대한 빌드와 테스트 스크립트를 실행합니다.
                // 예: sh './gradlew build'
            }
        }

        stage('Deploy') {
            when {
                anyOf {
                    branch 'main'
                    branch 'frontend'
                    branch 'backend'
                }
            }
            steps {
                // 배포 스크립트를 실행합니다. 실제 환경에서는 배포할 환경에 맞게 조건을 추가해야 할 수 있습니다.
                echo 'Deploying to target environment...'
                // 예: sh './deploy-script.sh'
            }
        }
    }

    post {
        always {
            // 항상 실행되는 단계, 예를 들어 청소 작업을 수행할 수 있습니다.
            echo 'Cleaning up...'
            // 예: sh 'make clean'
        }

        success {
            // 파이프라인 실행이 성공했을 때 실행됩니다.
            echo 'Pipeline completed successfully!'
        }

        failure {
            // 파이프라인 실행이 실패했을 때 실행됩니다.
            echo 'Pipeline failed!'
        }
    }
}
