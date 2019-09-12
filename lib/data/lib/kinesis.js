console.log(Date().toLocaleString()+":  lib/data/lib/kinesis.js, initial comment")
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-2' })

const kinesis = new AWS.Kinesis()

function send (streamName, partition, msg) {
  const params = {
    Data: JSON.stringify(msg),
    PartitionKey: partition,
    StreamName: streamName
  }

  kinesis.putRecord(params, (err, data) => {
    if (err) return console.error(err)
    else console.log(`Put Kinesis record with: ${JSON.stringify(data)}`)
  })
}

module.exports = { send }
