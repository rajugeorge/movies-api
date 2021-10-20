pipeline {
    agent any

    stages {
        stage('build') {
            steps {
                docker build -t 64.227.176.229:8083/movies-api:1.2 .
            }
        }
    }
}