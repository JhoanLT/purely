pipeline {
  agent any
  tools { nodejs 'nodejs' }
  options { disableConcurrentBuilds() }
  triggers { pollSCM('H/5 * * * *') }

  stages {
    stage('Checkout') {
      steps {
        checkout([$class: 'GitSCM',
          branches: [[name: '*/main']],
          userRemoteConfigs: [[url: 'https://github.com/JhoanLT/purely.git', credentialsId: 'github-pat']]
        ])
      }
    }
    stage('Install') {
      steps { sh 'npm ci' }
    }
    stage('Test') {
      steps { sh 'npm test --silent || true' }
      post {
        always { junit allowEmptyResults: true, testResults: 'reports/**/*.xml' }
      }
    }
    stage('Build') {
      steps { sh 'npm run build || true' }
      post {
        success { archiveArtifacts artifacts: 'dist/**/*', allowEmptyArchive: true }
      }
    }
  }
  post {
    always { echo "Pipeline frontend finalizado." }
  }
}