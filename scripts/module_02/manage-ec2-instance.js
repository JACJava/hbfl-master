// Imports
const AWS = require('aws-sdk')

AWS.config.update({region: 'us-east-2'})

// Declare local variables
const ec2 = new AWS.EC2()

function listInstances () {
  return new Promise((resolve, reject) => {
    ec2.describeInstances({}, (err, data) => {
      if (err) reject(err)
      else {
        resolve(data.Reservations.reduce((i,r) => {
          return i.concat(r.Instances)
        }, []))
      }
    })
  })
}

function terminateInstance (instanceId) {
  const params = {
    InstanceIds: [
      instanceId
    ]
  }

  return new Promise((resolve, reject) => {
    ec2.terminateInstances(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

listInstances()
.then(data => console.log(data))

 //terminateInstance('i-0a2fa740e67834c12')
 //terminateInstance('i-027c7422b6dd714bc')
 //terminateInstance('i-0293d1cd92868cdc7')
 // .then(data => console.log(data))
