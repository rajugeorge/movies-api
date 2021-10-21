pipeline {
    agent any
    def gv

    stages {

        stage('init') {
            steps {
                gv = load 'groovy/script.groovy'
            }
        }

        stage('build') {
            steps {
                gv.buildApp()
            }
        }
        stage('test') {
            steps {
                gv.buildApp()
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