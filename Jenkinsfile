#!/usr/bin/env groovy

library identifier: 'jenkins-shared-library@master', retriever: modernSCM(
    [$class: 'GitSCMSource',
    remote: 'https://github.com/rajugeorge/jenkins-shared-test.git'])

def gv

pipeline {
    agent any

    stages {

        stage('init') {
            steps {
                script{
                    gv = load 'groovy/script.groovy'
                    env.IMAGE_VERSION = "my app is cool"
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
                    echo "$IMAGE_VERSION"
                    buildImage('64.227.176.229:8083/movies-app:1.5')
                    dockerLogin()
                    dockerPush('64.227.176.229:8083/movies-app:1.5')
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