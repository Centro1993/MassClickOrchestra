pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        echo 'Building....'
        sh 'docker build -t centro1993/massclickorchestra .'
      }
    }
    stage('Deploy') {
        steps {
            echo 'Deploying...'
            sh '''docker run -p 8084:8084 -d centro1993/massclickorchestra'''
        }
    }
  }
}