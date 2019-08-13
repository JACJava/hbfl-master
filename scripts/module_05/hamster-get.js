//  have to run the following
// cd /hbfl/scripts/module_05
// npm install aws-sdk
// node hamster-get-.js

const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-2' })

const client = new AWS.DynamoDB.DocumentClient()

console.log("Scanning Hamster table.")

function getAll (TableName) {
  return new Promise((resolve, reject) => {
    client.scan({ TableName }, (err, data) => {
      if (err) {
        return reject(err)
      }
      resolve(data.Items)
      data.Items.forEach(function(item) {
                 console.log(
                      item.id + ": ",
                      item.name +": ",
                      item.type)
      console.log("Scan succeeded in resolve section")
      })
    })
  })
}

getAll('hamsters')

console.log("End Scanning Hamster table.")
