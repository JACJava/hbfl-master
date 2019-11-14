console.log(Date().toLocaleString()+":  mysql.client.js, initial comment for RDS updates")


// go get cloudformation stack information to grab the rds host endpoint from the output
const AWS = require('aws-sdk')
var cloudformation = new AWS.CloudFormation();
var params = {
  StackName: 'hbfl-stack-cf'
};
//console.log(Date().toLocaleString()+":  StackName:  "+stringify(params))

cloudformation.describeStacks(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});

var params = {
  LogicalResourceId: 'HamsterEC2Instance',
  StackName: 'hbfl-stack-cf'
};
cloudformation.describeStackResource(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {
    console.log(data)
    var obj = JSON.stringify(data);
    console.log(Date().toLocaleString()+":  obj:  "+obj);
    var obj2 = JSON.stringify(data[0].PhysicalResourceId);
    console.log(Date().toLocaleString()+":  obj2:  "+obj);
  }
});

const Sequelize = require('sequelize')
const host = 'user.cvdjxmakwjes.us-east-2.rds.amazonaws.com'
const database = 'user'
const username = 'admin'
const password = 'mypassword'

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 5000
  }
})

module.exports = sequelize
