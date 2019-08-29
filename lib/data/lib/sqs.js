// will send the results of each race simulation
console.log(Date().toLocaleString()+":  lib/data/lib/sqs.js, initial comment")
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-2' })

const sqs = new AWS.SQS()

function push (queueName, msg) {
  const params = {
    QueueName: queueName
  }

  return new Promise((resolve, reject) => {
    sqs.getQueueUrl(params, (err, data) => {
      if (err) reject(err)
      else {
        const params = {
          MessageBody: JSON.stringify(msg),
          QueueUrl: data.QueueUrl
        }
        console.log(Date().toLocaleString()+":  MessageBody:  "+MessageBody)
        sqs.sendMessage(params, (err) => {
          if (err) reject(err)
          else resolve()
        })
      }
    })
  })
}

module.exports = { push }
