pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        script {
          echo 'Building...'
        }
      }
    }

    stage('Test') {
      steps {
        echo 'Testing...'
      }
    }
  }

  post {
    always {
      echo '끝!'
    }
  }
}