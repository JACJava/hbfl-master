// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-2' })

// Declare local variables
const ec2 = new AWS.EC2()
const volumeId = 'vol-03c68e95bf7c69b43'
const instanceId = 'i-0968d4ae5319f78d6'

detachVolume(volumeId)
.then(() => attachVolume(instanceId, volumeId))

function detachVolume (volumeId) {
  // Configure detachVolume params
  const params = {
    VolumeId:  volumeId
  }

  return new Promise((resolve, reject) => {
      // TODO: Detach the volume
    ec2.detachVolume(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })

}

function attachVolume (instanceId, volumeId) {
  //Configure attachVolume params
  const params = {
    InstanceId:  instanceId,
    VolumeId:  volumeId,
    Device: '/dev/sdf'
  }
  return new Promise((resolve, reject) => {
    //Attach the volume
    ec2.attachVolume(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
