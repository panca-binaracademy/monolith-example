// PASSPORT PART

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

const authenticating = new LocalStrategy(
(username, password, done) => {
  User.findOne({ username })
    .then(user => {
      if (!user) return done(null, false)
      if (!user.verifyPassword(password)) return done(null, false) 
      return done(null, user)
    })
})
passport.use(authenticating)

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser(async (id, done) => done(null, await User.findById(id)))
module.exports = passport

// CONTROLLER PART

module.exports = {
  login: (req,res) => res.render('auth/login'),
  password: passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login'
  })
}