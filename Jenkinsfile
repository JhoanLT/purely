pipeline {
  agent any
  tools { nodejs 'node20' }

  options { timestamps() }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Versiones') {
      steps {
        sh 'node -v && npm -v'
      }
    }

    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Artefacto (dist)') {
      steps {
        archiveArtifacts artifacts: 'dist/**/*', onlyIfSuccessful: true
      }
    }
  }

  post {
    always { echo 'Pipeline frontend finalizado.' }
  }
}