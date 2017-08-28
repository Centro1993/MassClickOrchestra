pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        echo 'Building..'
        sh 'npm install -y'
      }
    }
    stage('Deploy') {
      steps {
        echo 'Deploying....'
        sh 'npm start'
      }
    }
  }
}