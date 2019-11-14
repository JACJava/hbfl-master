console.log(Date().toLocaleString()+":  mysql.client.js, initial comment for RDS updates")

// go get cloudformation stack information to grab the rds host endpoint from the output
const AWS = require('aws-sdk')
var cloudformation = new AWS.CloudFormation();

// var params = {
//   LogicalResourceId: 'HamsterEC2Instance',
//   StackName: 'hbfl-stack-cf'
// };
//
// PhysicalResourceId = cloudformation.describeStackResource(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else {
//     console.log(data.StackResourceDetail.PhysicalResourceId);
//     return(JSON.stringify(data.StackResourceDetail.PhysicalResourceId));
//   }
// });

PhysicalResourceId = getStackInfo();
console.log(PhysicalResourceId)

function getStackInfo () {
  const params = {
    LogicalResourceId: 'HamsterEC2Instance',
    StackName: 'hbfl-stack-cf'
  }

  return new Promise((resolve, reject) => {
    cloudformation.describeStackResource(params, (err, data) => {
      if (err) reject(err)
      else resolve(data.StackResourceDetail.PhysicalResourceId)
    })
  })
}


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
