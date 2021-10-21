def buildApp(){
    echo 'building the image....'
    withCredentials([usernamePassword(credentialsId: 'nexus-login-credentials', passwordVariable: 'PASS', usernameVariable: 'USER')]){
        sh 'docker build -t 64.227.176.229:8083/movies-app:1.3 .'
        sh 'echo $PASS | docker login -u $USER --password-stdin 64.227.176.229:8083'
        sh 'docker push 64.227.176.229:8083/movies-app:1.3'
    }
}

def testApp(){
    echo 'testing the application....'
}

def deployApp(){
    echo 'testing the application....'
}

return this