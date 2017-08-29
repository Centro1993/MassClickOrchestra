pipeline {
  agent any

  environment {
          IMAGE_NAME = 'centro1993/massclickorchestra'
      }

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
            sh '''docker rm $(docker stop $(docker ps -a -q --filter ancestor=$IMAGE_NAME --format="{{.ID}}"))'''
            sh '''docker run -p 8084:8084 -d $IMAGE_NAME'''
        }
    }
  }
}