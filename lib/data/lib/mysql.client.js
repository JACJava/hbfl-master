console.log(Date().toLocaleString()+":  mysql.client.js, initial comment for RDS updates")

// go get cloudformation stack information to grab the rds host endpoint from the output
const AWS = require('aws-sdk')
var cloudformation = new AWS.CloudFormation();

// var params = {
//   LogicalResourceId: 'HamsterRDSDatabase',
//   StackName: 'hbfl-rds-stack-cf'
// };
//
// cloudformation.describeStackResource(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else {
//     console.log(data.StackResourceDetail);
//     console.log(data.StackResourceDetail.PhysicalResourceId);
//     return(JSON.stringify(data.StackResourceDetail.PhysicalResourceId));
//   }
// });


var params2 = {
  StackName: 'hbfl-rds-stack-cf'
};

cloudformation.describeStacks(params2, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {
    // console.log("data");
    // console.log(data);
    // console.log("ResponseMetadata");
    // console.log(data.ResponseMetadata);
    // console.log("Stacks");
    // console.log(data.Stacks);
    // console.log("Stacks[0].StackName");
    // console.log(data.Stacks[0].StackName);
    // console.log("Stacks[0].Outputs");
    // console.log(data.Stacks[0].Outputs);
    // console.log("Stacks[0].Outputs[0]");
    // console.log(data.Stacks[0].Outputs[0]);
    // console.log("adding iterator");
    // console.log(Object.keys(data.Stacks[0].Outputs));
    // console.log("adding iteratorwith foreach");
    Object.keys(data.Stacks[0].Outputs).forEach(function(key) {
      // console.log('Key : ' + key + ', Value : ' + JSON.stringify(data.Stacks[0].Outputs[key]))
      // console.log("just the data")
      // console.log(data.Stacks[0].Outputs[key])
      // console.log("just the data and the OutputKey")
      // console.log(data.Stacks[0].Outputs[key].OutputKey)
      console.log("just the data and the OutputValue")
      console.log(data.Stacks[0].Outputs[key].OutputValue)
      console.log("just the data and the OutputValue in string format")
      console.log(JSON.stringify(data.Stacks[0].Outputs[key].OutputValue))
      if (data.Stacks[0].Outputs[key].OutputKey = "HamsterRDSDatabaseEndpoint") {
        console.log("Hooray!! it equals the endpoint")
        console.log(data.Stacks[0].Outputs[key].OutputKey)
        console.log(data.Stacks[0].Outputs[key].OutputValue)
      } else {
        console.log("It does not equal the endpoint")
        console.log(data.Stacks[0].Outputs[key].OutputKey)
        console.log(data.Stacks[0].Outputs[key].OutputValue)
      }

    });
    //return(JSON.stringify(data.StackResourceDetail.PhysicalResourceId));
  }
});


// PhysicalResourceId = getStackInfo()
// .then((data) => console.log("this is in the .then:  "+data));

// PhysicalRecordId = getStackInfo()
// .then(function(result){
// console.log(result)
// });

// console.log("PhysicalRecordId:  "+PhysicalRecordId)
//
// function getStackInfo () {
//   const params = {
//     LogicalResourceId: 'HamsterEC2Instance',
//     StackName: 'hbfl-rds-stack-cf'
//   }
//   return new Promise((resolve, reject) => {
//     cloudformation.describeStackResource(params, (err, data) => {
//       if (err) reject(err)
//       else resolve(data.StackResourceDetail.PhysicalResourceId)
//     })
//   })
// }


const Sequelize = require('sequelize')
const host = 'user.cvdjxmakwjes.us-east-2.rds.amazonaws.com'
//const host = 'user2.cvdjxmakwjes.us-east-2.rds.amazonaws.com'
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
