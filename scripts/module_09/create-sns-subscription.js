// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-2' })

// Declare local variables
const sns = new AWS.SNS()
const type = 'email'
const endpoint = ''
const topicArn = 'arn:aws:sns:us-east-2:688220141166:hamster-topic'

createSubscription(type, topicArn, endpoint)
.then(data => console.log(data))

function createSubscription (type, topicArn, endpoint) {
  // params const
  const params = {
    Protocol:  type,
    TopicArn:  topicArn,
    Endpoint:  endpoint
  }
  return new Promise((resolve, reject) => {
    // Subscribe
    sns.subscribe(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
