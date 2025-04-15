pipeline {
    agent any

    environment {
        ACR_CREDENTIALS = credentials('azure_acr_creds')
        ACR_NAME = 'shoplocalacr.azurecr.io'
        PROJECT_NAME = 'vms-frontend-2022'
    }

    stages {
        stage('Set Pipeline Variables') {
            steps {
                script {
                    if (env.GIT_BRANCH == 'origin/main') {
                        env.ENV = 'prod'
                    } else if (env.GIT_BRANCH == 'origin/testing1') {
                        env.ENV = 'test'
                    } else if (env.GIT_BRANCH == 'origin/development') {
                        env.ENV = 'dev'
                    } else {
                        error "Exiting: Current branch '${env.GIT_BRANCH}' does not match any expected environments."
                    }

                    env.SHORT_GIT = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
                    env.DOCKER_TAG = "${env.ACR_NAME}/${env.PROJECT_NAME}:${env.SHORT_GIT}"
                    env.DEPLOYMENT_NAME = "deployment.apps/${env.ENV}-${env.PROJECT_NAME}"
                    env.NAME_SPACE = "shop-local-${env.ENV}"
                }
            }
        }

        stage('Copy Application Variables') {
            steps {
                sh "cp -a /home/jenkins-pipelines-variables/${env.PROJECT_NAME}/${env.ENV}/. $WORKSPACE"
                sleep 10
                sh "cat $WORKSPACE/.env"
            }
        }
        
        stage('Build Docker image') {
            steps {
                script {
                    docker.build("${env.DOCKER_TAG}")
                }
            }
        }
        
        stage('Push to ACR') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'azure_acr_creds', 
                                                     usernameVariable: 'SERVICE_PRINCIPAL_ID', 
                                                     passwordVariable: 'SERVICE_PRINCIPAL_PASSWORD')]) {
                        sh "docker login ${env.ACR_NAME} -u $SERVICE_PRINCIPAL_ID -p $SERVICE_PRINCIPAL_PASSWORD"
                        sh "docker push ${env.DOCKER_TAG}"
                    }
                }
            }
        }
        stage('Deploy to AKS') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'azure_acr_creds', 
                                                     usernameVariable: 'SERVICE_PRINCIPAL_ID', 
                                                     passwordVariable: 'SERVICE_PRINCIPAL_PASSWORD')]) {
                        sh "docker login ${env.ACR_NAME} -u $SERVICE_PRINCIPAL_ID -p $SERVICE_PRINCIPAL_PASSWORD"
                        sh "docker pull ${env.DOCKER_TAG}"
                    }
                }

                script {
                    withCredentials([azureServicePrincipal('az-aks-creds')]) {
                        sh 'az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET -t $AZURE_TENANT_ID'
                        sh "az aks command invoke --resource-group shop-local-infra-opt --name shop-local-aks-cluster --command 'kubectl set image ${env.DEPLOYMENT_NAME} *=${env.DOCKER_TAG} -n ${env.NAME_SPACE}'"
                    }
                }
            }
        }
        stage('Cleanup Workspace (After)') {
            steps {
                cleanWs() // Clean workspace after pipeline completion
            }
        }
    }
}
