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
        sh 'docker stop $CONTAINER_NAME'
        sh 'docker rm $CONTAINER_NAME'
        sh 'docker run -p 8084:8084 -d --name=$CONTAINER_NAME $IMAGE_NAME'
      }
    }
  }
  environment {
    IMAGE_NAME = 'centro1993/massclickorchestra'
    CONTAINER_NAME = 'mco'
  }
}