// Imports
const AWS = require('aws-sdk')
const helpers = require('./helpers')

AWS.config.update({ region: 'us-east-2' })

// Declare local variables
const lambda = new AWS.Lambda()
const functionName = 'hamster-kinesis-stream-consumer'
const kinesisArn = 'arn:aws:kinesis:us-east-2:688220141166:stream/hamster-race-results'
let roleArn

helpers.createLambdaKinesisRole2()
.then((arn) => {
  roleArn = arn
  return helpers.zipLambdaFile()
})
.then((codeBuffer) => createLambda(roleArn, functionName, codeBuffer))
.then(() => createTrigger(kinesisArn, functionName))
.then(data => console.log(data))
.catch(err => console.error(err))

function createLambda (roleArn, lambdaName, zippedCode) {
  const params = {
    Code: {
      ZipFile: zippedCode
    },
    FunctionName: lambdaName,
    Handler: 'index.handler',
    Role: roleArn,
    Runtime: 'nodejs10.x',
    Description: 'A kinesis consumer for the hbfl demo project',
    MemorySize: 128,
    Publish: true,
    Timeout: 15
  }

  return new Promise((resolve, reject) => {
    lambda.createFunction(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

function createTrigger (kinesisArn, lambdaName) {
  // Create params const for trigger
  const params = {
    EventSourceArn:  kinesisArn,
    FunctionName:  lambdaName,
    StartingPosition:  'LATEST',
    BatchSize:  100
  }

  return new Promise((resolve, reject) => {
    lambda.createEventSourceMapping(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
