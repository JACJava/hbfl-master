console.log(Date().toLocaleString()+":  mysql.client.js, initial comment for RDS updates")

// go get cloudformation stack information to grab the rds host endpoint from the output
const AWS = require('aws-sdk')
var cloudformation = new AWS.CloudFormation();

var params2 = {
  StackName: 'hbfl-rds-stack-cf'
};

function getcloudstuff (callback) {
  let hostname = "initial_value"
  cloudformation.describeStacks(params2, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      Object.keys(data.Stacks[0].Outputs).forEach(function(key) {
          console.log("just the data and the OutputKey")
          console.log(data.Stacks[0].Outputs[key].OutputKey)
          if (data.Stacks[0].Outputs[key].OutputKey == 'HamsterRDSDatabaseEndpoint') {
            console.log("Hooray!! it equals the endpoint")
            console.log(data.Stacks[0].Outputs[key].OutputKey)
            console.log(data.Stacks[0].Outputs[key].OutputValue)
            //set or return host variable here! but how!!
            //hostname = data.Stacks[0].Outputs[key].OutputValue
            callback(data.Stacks[0].Outputs[key].OutputValue)
            console.log ("hostname variable inside the cloudformation. routine:  "+hostname)
            console.log ("before the return:  "+hostname)

        } else {
            console.log("It does not equal the endpoint")
            console.log(data.Stacks[0].Outputs[key].OutputKey)
            console.log(data.Stacks[0].Outputs[key].OutputValue)
        }
        });
      }
  });
  return hostname;
}


const Sequelize = require('sequelize')
//const host = 'user.cvdjxmakwjes.us-east-2.rds.amazonaws.com'
//hostname2 = getcloudstuff();

getcloudstuff(function(hostname2){
  console.log ("hostname2 variable outside the cloudformation. routine:  "+hostname2)
});

getcloudstuff(function(host){
  console.log ("host variable outside the cloudformation. routine:  "+host)
});

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
