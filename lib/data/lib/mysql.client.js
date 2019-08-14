console.log(Date().toLocaleString()+":  mysql.client.js, initial comment")

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
