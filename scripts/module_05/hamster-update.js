//  have to run the following
// cd /hbfl/scripts/module_05
// npm install aws-sdk
// node hamster-update.js

const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-2' })

const client = new AWS.DynamoDB.DocumentClient()

console.log(Date().toLocaleString()+":  Updating Hamster id 1 in the hamster table.")

hamsterid = 1
console.log(Date().toLocaleString()+":  type of id:  "+typeof hamsterId)

var params = {
  TableName:  "hamsters",
  Key:  {
    "id": hamsterId
  },
  UpdateExpression:  "set #hsname = :n",
  ExpressionAttributeValues:{
    ":n":"JulieCakes1"
  },
  ExpressionAttributeNames:{
    "#hsname":"name"
  },
  ReturnValues:  "UPDATED_NEW"
}

console.log(Date().toLocaleString()+":  hamster-update, attempting to update" + params)

client.update(params, function(err, data) {
    if (err) {
        console.error(Date().toLocaleString()+":  Unable to update item. Error JSON:", JSON.stringify(err, null, 2))
    } else {
        console.log(Date().toLocaleString()+":  UpdateItem succeeded:", JSON.stringify(data, null, 2))
    }
  })

console.log(Date().toLocaleString()+":  End Updating Hamster table.")