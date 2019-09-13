// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-2' })

// Declare local variables
const route53 = new AWS.Route53()
const hzId = '/hostedzone/Z186JH4PYS50KU'

createRecordSet(hzId)
.then(data => console.log(data))

function createRecordSet (hzId) {
  const params = {
    HostedZoneId: hzId,
    ChangeBatch: {
      Changes: [
        {
          Action: 'CREATE',
          ResourceRecordSet: {
            Name: 'julie1023aws.com',
            Type: 'A',
            AliasTarget: {
              DNSName: 'hamsterELB-175195876.us-east-2.elb.amazonaws.com',
              EvaluateTargetHealth: false,
              HostedZoneId: 'Z3AADJGX6KTTL2'
            }
          }
        }
      ]
    }
  }

  return new Promise((resolve, reject) => {
    route53.changeResourceRecordSets(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
