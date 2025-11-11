pipeline {
  agent {
    docker {
      image 'node:20-bullseye'
      args '-u root:root'
    }
  }
  options { timestamps() }

  stages {
    stage('Checkout') { steps { checkout scm } }

    stage('Versions') {
      steps { sh 'node -v && npm -v' }
    }

    stage('Install') {
      steps { sh 'npm ci' }
    }

    stage('Build') {
      steps { sh 'npm run build' }
    }

    stage('Archive dist') {
      steps { archiveArtifacts artifacts: 'dist/**/*', onlyIfSuccessful: true }
    }
  }

  post {
    always { echo 'Pipeline frontend finalizado.' }
  }
}