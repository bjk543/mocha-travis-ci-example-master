node('master') {


    currentBuild.result = "SUCCESS"

    try {

       stage('Checkout'){

          checkout scm
       }

       stage('Test'){

         env.NODE_ENV = "test"

         print "Environment will be : ${env.NODE_ENV}"

         sh 'node -v'
         sh 'npm prune'
         sh 'npm install'
         sh 'npm test'

       }

       stage('Build Docker'){
            
            sh 'sh ./dockerBuild.sh'
       }

       stage('Deploy'){

         echo 'Push to Repo'
        
         sh 'sh ./dockerPushToRepo.sh'

         echo 'ssh to web server and tell it to pull new image'
         sh 'ssh deploy@xxxxx.xxxxx.com running/xxxxxxx/dockerRun.sh'

       }

       stage('Cleanup'){

         echo 'prune and cleanup'
         sh 'npm prune'
         sh 'rm node_modules -rf'

         mail body: "project build successful ${env.BUILD_URL}",
                     from: 'bjk543@gmail.com',
                     replyTo: 'bjk543@gmail.com',
                     subject: 'project build successful',
                     to: 'bjk543@gmail.com'
       }



    }
    catch (err) {

        currentBuild.result = "FAILURE"

            mail body: "project build error is here: ${env.BUILD_URL}" ,
            from: 'bjk543@gmail.com',
            replyTo: 'bjk543@gmail.com',
            subject: 'project build failed',
            to: 'bjk543@gmail.com'

        throw err
    }

}
