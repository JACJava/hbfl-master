//  In order for this to run correctly, the AWS configuration options must be
//  correct in the ec2 instance
//  AWS configure
//  enter developer key and secret key, region, and json
//  solved this by creating the hamster-get.js program and got an error regarding
//  permissions to the dynamoDB instance:
//  CredentialsError: Missing credentials in config
//  there must be a way to do this with the .aws/ directory so that you don't have type it in manually
//  can do it that way and also with json file -- but DO NOT COMMIT UP TO GITHUB!!
console.log(Date().toLocaleString()+":  dynamo.js, initial comment")

const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-2' })

const client = new AWS.DynamoDB.DocumentClient()

function getAll (TableName) {
  return new Promise((resolve, reject) => {
    client.scan({ TableName }, (err, data) => {
      if (err) {
        return reject(err)
      }
      resolve(data.Items)
      data.Items.forEach(function(item) {
                 console.log(Date().toLocaleString()+":  ",
                      item.id + ", ",
                      item.name +", ",
                      item.type)
      console.log(Date().toLocaleString()+":  dynamo.js, GetAll function succeeded")
      })
    })
  })
}

function get (TableName, id) {
  return new Promise((resolve, reject) => {
    const params = {
      TableName,
      KeyConditionExpression: 'id = :hkey',
      ExpressionAttributeValues: {
        ':hkey': +id
      }
    }

    client.query(params, (err, data) => {
      if (err) {
        return reject(err)
      }
      resolve(data.Items[0])
      console.log(Date().toLocaleString()+":  dynamo.js, Get function succeeded")
    })
  })
}

function put (TableName, Item) {
  return new Promise((resolve, reject) => {
    client.put({ TableName, Item }, (err, data) => {
      if (err) reject(err)
      else resolve(data)
        console.log(Date().toLocaleString()+":  dynamo.js, Put function succeeded")
    })
  })
}

module.exports = {
  get,
  getAll,
  put
}
