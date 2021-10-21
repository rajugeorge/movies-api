pipeline {
    agent any
    environment {
        NEW_VERSION = '1.3.0'
    }

    stages {
        stage('build') {
            steps {
                //docker build -t 64.227.176.229:8083/movies-api:1.2 .
                echo 'build'
                echo "building version ${NEW_VERSION}"
            }
        }
        stage('test') {
            steps {
                echo "test"
            }
        }
        stage('deploy') {
            steps {
                echo "deploy"
            }
        }
    }
}