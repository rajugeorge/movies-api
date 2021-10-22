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
                    env.IMAGE_VERSION = sh (script: "cat ./package.json | grep -m 1 version | sed 's/[^0-9.]//g'", returnStdout: true).trim()
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
                    buildImage("64.227.176.229:8083/movies-app:$IMAGE_VERSION")
                    dockerLogin()
                    dockerPush("64.227.176.229:8083/movies-app:$IMAGE_VERSION")
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