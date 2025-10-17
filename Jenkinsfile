pipeline {
  agent any

  environment {
    DOCKERHUB_USER = 'harikiranmp'
    IMAGE = "${DOCKERHUB_USER}/sample-app"
    TAG = "build-${env.BUILD_NUMBER}"
  }

  triggers {
    pollSCM('* * * * *') // optional if webhook not yet configured
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t $IMAGE:$TAG .'
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                                         usernameVariable: 'USER',
                                         passwordVariable: 'PASS')]) {
          sh '''
            echo "$PASS" | docker login -u "$USER" --password-stdin
            docker push $IMAGE:$TAG
            docker logout
          '''
        }
      }
    }
  }

  post {
    success { echo "✅ Image pushed: $IMAGE:$TAG" }
    failure { echo "❌ Build failed" }
  }
}
