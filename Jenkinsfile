def gv

pipeline {
    agent any

    stages {

        stage('init') {
            steps {
                script{
                    gv = load 'groovy/script.groovy'
                }
            }
        }

        stage('build') {
            steps {
                script {
                    gv.buildApp()
                }
            }
        }
        stage('test') {
            steps {
               script {
                    gv.buildApp()
               }
            }
        }
        stage('deploy') {
            steps {
                echo "deploy"
                echo "deploying with ${SERVER_CREDENTIALS}"
            }
        }
    }
}