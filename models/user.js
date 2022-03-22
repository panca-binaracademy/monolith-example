// models/user.js
const bcrypt = require('bcrypt')
const sampleAdminData = {
  id: Math.floor(Math.random() * 100), username: 'admin',password: bcrypt.hashSync('123456', 10)
}

function User({ id, username, password }) { // static, sebelum ORM
  this.id = id
  this.username = username
  this.password = password
  return this
}

User.findOne = function({ username }) {
  if (username !== 'admin') return Promise.resolve(null)
  const user = new User(sampleAdminData)
  return Promise.resolve(user)
}

User.findById = function(id) {
  if (sampleAdminData.id === id) {
    const user= new User(sampleAdminData)
    return Promise.resolve(user)
  }
  return Promise.resolve(null)
}

User.prototype.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = User