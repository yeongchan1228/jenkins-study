pipeline {
    agent any

// 몇 분 주기로 파이프라인이 트리거 될 것인가
// cron 문법
// 3분 주기
    // triggers { 
    //     pollSCM('*/3 * * * *')
    // }

// 환경 변수
// credentials로 해당 이름의 값을 불러옴
    environment {
      AWS_ACCESS_KEY_ID = credentials('awsAccessKeyId')
      AWS_SECRET_ACCESS_KEY = credentials('awsSecretAccessKey')
      AWS_DEFAULT_REGION = 'ap-northeast-2' // 서울
      HOME = '.' 
    }

    stages {
        stage('Prepare') {
            agent any
            
            steps {
                echo 'Clonning Repository'

                git url: 'https://github.com/yeongchan1228/jenkins-study.git',
                    branch: 'master',
                    credentialsId: 'gittokenforjenkins'
            }

            post {
                success {
                    echo 'Successfully Pulled Repository'
                }

                always {
                  echo "i tried..."
                }

                cleanup {
                  echo "after all other post condition"
                }
            }
        }
        
        // stage('Deploy Frontend') {
        //   steps {
        //     echo 'Deploying Frontend'
        //     dir ('./web'){
        //         sh '''
        //         aws s3 sync ./ s3://yc-jenkins-test
        //         '''
        //     }
        //   }

        //   post {
        //       success {
        //           echo 'Successfully Pulled Repository'

        //           mail  to: 'gks54410@gmail.com',
        //                 subject: "Deploy Frontend Success",
        //                 body: "Successfully deployed frontend!"

        //       }

        //       failure {
        //           echo 'I failed :('

        //           mail  to: 'gks54410@gmail.com',
        //                 subject: "Failed Pipelinee",
        //                 body: "Something is wrong with deploy frontend"
        //       }
        //   }
        // }
        
        // Lint 단계
        // stage('Lint Backend') {
        //     // Docker plugin and Docker Pipeline 설치
        //     agent {
        //       docker {
        //         image 'node:latest'
        //       }
        //     }
            
            // steps {
            //   dir ('./server'){
            //       sh '''
            //       npm install&&
            //       npm run lint
            //       '''
            //   }
            // }
        // }
        
        // 테스트 단계
        // stage('Test Backend') {
        //   agent {
        //     docker {
        //       image 'node:latest'
        //     }
        //   }
        //   steps {
        //     echo 'Test Backend'

        //     dir ('./server'){
        //         sh '''
        //         npm install
        //         npm run test
        //         '''
        //     }
        //   }
        // }
        
        stage('Bulid Backend') {
          agent any
          steps {
            echo 'Build Backend'

            dir ('./server'){
                sh """
                docker build . -t server
                """
            }
          }

          post {
            failure {
              error 'This pipeline stops here...'
            }
          }
        }
        
        stage('Deploy Backend') {
          agent any

          steps {
            echo 'Build Backend'

// docker rm -f $(docker ps -aq) 도커 컨테이너가 실행 중이면 추가해야 함
            dir ('./server'){
                sh '''
                docker run -p 80:80 -d server
                '''
            }
          }

        //   post {
        //     success {
        //       mail  to: 'frontalnh@gmail.com',
        //             subject: "Deploy Success",
        //             body: "Successfully deployed!"
                  
        //     }
        //   }
        }
    }
}