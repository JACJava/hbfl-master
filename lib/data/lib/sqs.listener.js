// will poll the queue every 5 seconds, and will update the master record in dynamo.db
console.log(Date().toLocaleString()+":  lib/data/lib/sqs.listener.js, initial comment")
const AWS = require('aws-sdk')
const hamsters = require('../hamsters')

const RACE_QUEUE = 'hamster-race-results'

AWS.config.update({ region: 'us-east-2' })

const sqs = new AWS.SQS()
const client = new AWS.DynamoDB.DocumentClient()
TableName = 'hamsters'

function init () {
  return Promise.resolve(setInterval(() => {
    poll()
    .then(msg => console.log(`${new Date()} - ${msg}`))
    .catch(err => console.error(`${new Date()} - ${err}`))
  }, 5000))
}

function poll () {
  const params = {
    QueueName: RACE_QUEUE
  }

  return new Promise((resolve, reject) => {
    sqs.getQueueUrl(params, (err, queueData) => {
      if (err) reject(err)
      else {
        const params = {
          QueueUrl: queueData.QueueUrl,
          MaxNumberOfMessages: 10,
          VisibilityTimeout: 15
        }

        sqs.receiveMessage(params, (err, msgData) => {
          if (err) reject(err)
          else if (!msgData.Messages || !msgData.Messages.length) {
            resolve(`No messages in queue ${RACE_QUEUE}`)
          } else {
            Promise.all(getPutHamsterPromises(msgData.Messages))
            .then(() => deleteMsgs(msgData.Messages, queueData.QueueUrl))
            .then(() => {
              console.log(`Processed ${msgData.Messages.length} messages from SQS`)
              return poll()
            })
            .catch(reject)
          }
        })
      }
    })
  })
}

function deleteMsgs (results, queueUrl) {
  const promises = results.map((result) => {
    const params = {
      QueueUrl: queueUrl,
      ReceiptHandle: result.ReceiptHandle
    }

    return new Promise((resolve, reject) => {
      sqs.deleteMessage(params, (err, data) => {
        if (err) reject(err)
        else resolve(data)
      })
    })
  })

  return Promise.all(promises)
}

function getPutHamsterPromises (messages) {
  const resultsMap = groupMessagesByHamster(messages)
  const promises = []

  for (const key in resultsMap) {
    promises.push(putResults(key, resultsMap[key]))
  }

  return promises
}

function groupMessagesByHamster (messages) {
  const hamMap = {}

  messages.map((message) => {
    const result = JSON.parse(message.Body)
    if (!hamMap[result.hamsterId]) {
      hamMap[result.hamsterId] = []
    }
    hamMap[result.hamsterId] = hamMap[result.hamsterId].concat(result)
    return result
  })

  return hamMap
}

function putResults (hamsterId, results) {
  return new Promise((resolve, reject) => {
    hamsters.get(hamsterId)
    .then((hamster) => {
      if (!hamster.results) {
        hamster.results = []
      }

      hamster.results = hamster.results.concat(results)

      console.log(Date().toLocaleString()+":  lib/data/lib/sqs.listener.js, in putResults: ")
      console.log(Date().toLocaleString()+":  hamsterId: "+hamsterId)
      console.log(Date().toLocaleString()+":  type of hamsterId: "typeof hamsterId);
      hamsterIdNumber = Number(hamsterId)
      console.log(Date().toLocaleString()+":  type of hamsterIDNumber:  "+typeof hamsterIdNumber)

      var params = {
        TableName:  TableName,
        Key:  {
          "id": hamsterIdNumber
        },
        UpdateExpression:  "set #hsname = :n",
        ExpressionAttributeValues:{
          ":n":"RandomJulie"
        },
        ExpressionAttributeNames:{
          "#hsname":"name"
        },
        ReturnValues:  "UPDATED_NEW"
      }

      console.log(Date().toLocaleString()+":  hamster-update, attempting to update" + params)

      client.update(params, function(err, data) {
          if (err) {
              console.error(Date().toLocaleString()+"Unable to update item. Error JSON:", JSON.stringify(err, null, 2))
          } else {
              console.log(Date().toLocaleString()+"UpdateItem succeeded:", JSON.stringify(data, null, 2))
          }
        })

      console.log(Date().toLocaleString()+"End Updating Hamster table.")
    //return hamsters.putjak('hamsters',hamster)
    })
    .then(resolve)
    .catch(reject)
  })
}

// function putjak (TableName, Item) {
//   return new Promise((resolve, reject) => {
//     clientjak.put({ TableName, Item }, (err, data) => {
//       if (err) reject(err)
//       else resolve(data)
//         console.log(Date().toLocaleString()+":  sqslistener.js, Putjak function succeeded")
//     })
//   })
// }

module.exports = {
  init
}
