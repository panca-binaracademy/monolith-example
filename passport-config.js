const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const initialize = (passport, getUserByName, getUserById) => {

  const authenticateUser = async (username, password, done) => {
    const user = getUserByName(username)
    if ( user == null ) {
      return done(null, false, {message: 'no user'})
    }
    try {
      if ( await bcrypt.compare(password, user.password) ) {
        return done(null, user)
      } else {
        return done(null, false, {message: 'wrong password'})
      }
    } catch (err) {
        return done(err)
    }
  }
  
  passport.use(
    new LocalStrategy(
      { usernameField: 'username', password: 'password' },
      authenticateUser
    )
  )
  passport.serializeUser( (user, done) => done(null, user.id))
  passport.deserializeUser( (id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize