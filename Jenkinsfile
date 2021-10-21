#!/usr/bin/env groovy

@Library('jenkins-shared-test')

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
                    buildImage('64.227.176.229:8083/movies-app:1.5')
                    dockerLogin('64.227.176.229:8083/movies-app:1.5')
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