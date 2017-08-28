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
        sh 'docker build -t massclickorchestra .'
      }
    }
    stage('Deploy') {
        steps {
            echo 'Deploying...'
            sh '''docker run -it --rm --name mco massclickorchestra
        }
    }
  }
}