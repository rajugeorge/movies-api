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
                    sh 'npm version patch -no-git-tag-version --force'
                    def version = sh (script: "cat ./package.json | grep -m 1 version | sed 's/[^0-9.]//g'", returnStdout: true).trim()
                    env.IMAGE_VERSION = "$version-$BUILD_NUMBER"
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
                    buildImage("64.227.176.229:8083/movies-app:${IMAGE_VERSION}")
                    dockerLogin()
                    dockerPush("64.227.176.229:8083/movies-app:${IMAGE_VERSION}")
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
        // stage('deploy') {
        //     steps {
        //         script {
        //             echo "deploying to ec2..............."
        //             def shellCmd = "bash ./server-cmds.sh ${IMAGE_VERSION}"
        //            sshagent(['ec2-server-key']) {
        //                sh 'scp server-cmds.sh ec2-user@3.110.49.80:/home/ec2-user'
        //                sh 'scp docker-compose-deploy.yaml ec2-user@3.110.49.80:/home/ec2-user'
        //                sh "ssh -o StrictHostKeyChecking=no ec2-user@3.110.49.80 ${shellCmd}"
        //            }
        //        }
        //     }
        // }
        stage('kube test') {
            environment {
                AWS_ACCESS_KEY_ID = credentials('jenkins_aws_access_key_id')
                AWS_SECRET_ACCESS_KEY = credentials('jenkins_aws_secret_access_key')
            }
            steps {
                script {
                    echo 'deploying docker image .....'
                    sh 'kubectl create deployment nginx-deployment --image=nginx'
               }
            }
        }
        stage('commit version update') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'github-credentials', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                        script {
                            env.encodedPass=URLEncoder.encode(GIT_PASSWORD, "UTF-8")
                        }
                        sh 'git config --global user.email "jenkins@example.com"'
                        sh 'git config --global user.name "jenkins"'
                        
                        sh 'git status'
                        sh 'git branch'
                        sh 'git config --list'

                        sh 'git remote set-url origin https://$GIT_USERNAME:$GIT_PASSWORD@github.com/rajugeorge/movies-api.git'
                        sh 'git add .'
                        sh 'git commit -m "ci: version bump"'
                        sh 'git push origin HEAD:main'
                    }
                }
            }
        }
    }
}