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
            when {
                expression {
                    BRANCH_NAME == 'main'
                }
            }
            steps {
                script {
                    gv.buildApp()
                }
            }
        }
        stage('test') {
            steps {
               script {
                    gv.testApp()
               }
            }
        }
        stage('deploy') {
            steps {
                script {
                    gv.deployApp()
               }
            }
        }
    }
}