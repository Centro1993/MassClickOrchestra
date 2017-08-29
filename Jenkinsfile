pipeline {
  agent any
  stages {
    stage('Install') {
      steps {
        echo 'Installing..'
        sh 'npm install'
      }
    }
    stage('Build') {
      steps {
        echo 'Building....'
        sh 'docker build -t $IMAGE_NAME .'
      }
    }
    stage('Deploy') {
      steps {
        echo 'Deploying...'
        sh '''existing = $(docker ps | grep $IMAGE_NAME | grep -o "^[0-9a-z]*")  
if [ ! -z "$existing" ]; then  
  docker stop $existing
fi'''
        sh 'docker run -p 8084:8084 -d $IMAGE_NAME'
      }
    }
  }
  environment {
    IMAGE_NAME = 'centro1993/massclickorchestra'
  }
}