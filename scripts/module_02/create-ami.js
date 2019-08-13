// Imports
// Import the aws-sdk
const AWS = require('aws-sdk')

// Configure region
AWS.config.update({region: 'us-east-2'})

// Declare local variables
// Create an ec2 object
const ec2 = new AWS.EC2()

createImage('i-0691acb4cda03d395', 'hamsterImage')
.then(() => console.log('Complete'))

function createImage (seedInstanceId, imageName) {
  // Implement AMI creation
  const params = {
      InstanceId: seedInstanceId,
      Name: imageName
  }

  return new Promise((resolve, reject) => {
    ec2.createImage(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })


}
