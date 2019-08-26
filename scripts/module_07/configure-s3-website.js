// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-2' })

// Declare local variables
const s3 = new AWS.S3()

configureS3Site('hamster-bucket-julieaws')
.then(data => console.log(data))

function configureS3Site (bucketName) {
  // Create params const object
  const params = {
    Bucket:  bucketName,
    WebsiteConfiguration:  {
      IndexDocument:  {
        Suffix: 'index.html'
      }
    }
  }

  return new Promise((resolve, reject) => {
    // Call putBucketWebsite
    s3.putBucketWebsite(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
