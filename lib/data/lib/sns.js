const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-2' })

const sns = new AWS.SNS()
const TOPIC_ARN = 'arn:aws:sns:us-east-2:688220141166:hamster-topic'

function publish (msg) {
  // Create params const object
  const params = {
    TopicArn:  TOPIC_ARN,
    Message:  msg
  }
  return new Promise((resolve, reject) => {
    // Publish message
    sns.publish(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

module.exports = { publish }
