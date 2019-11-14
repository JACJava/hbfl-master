console.log(Date().toLocaleString()+":  mysql.client.js, initial comment for RDS updates")

// go get cloudformation stack information to grab the rds host endpoint from the output
const AWS = require('aws-sdk')
var cloudformation = new AWS.CloudFormation();
var params = {
  StackName: 'hbfl-stack-cf'
};

cloudformation.describeStacks(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});

var PhysicalResourceIdFromCF = 'initial value'

var params = {
  LogicalResourceId: 'HamsterEC2Instance',
  StackName: 'hbfl-stack-cf'
};

cloudformation.describeStackResource(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {
    //console.log(data);

    console.log(data.ResponseMetadata);
    console.log("ResponseMetadata with Stringify:  "+JSON.stringify(data.ResponseMetadata));

    console.log(data.StackResourceDetail);
    console.log("StackResourceDetail with Stringify:  "+JSON.stringify(data.StackResourceDetail));

    console.log(data.StackResourceDetail.PhysicalResourceId);
    console.log("StackResourceDetail.PhysicalResourceId with Stringify:  "+JSON.stringify(data.StackResourceDetail.PhysicalResourceId));

    PhysicalResourceIdFromCF = (data.StackResourceDetail.PhysicalResourceId);
    console.log("variable PhysicalResourceIdFromCF:  "+PhysicalResourceIdFromCF);

    // var obj = JSON.stringify(data);
    // console.log(Date().toLocaleString()+":  obj:  "+obj);
  }
});

console.log("OUTSIDE variable PhysicalResourceIdFromCF:  "+PhysicalResourceIdFromCF);

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
