const bcrypt = require('bcrypt')
const passportInit = require('../passport-config')
const passport = require('passport')

passportInit(
  passport,
  username => users.find( user => user.username === username),
  id => users.find( user => user.id === id),
)

module.exports = {
  register: (req,res) => res.render('auth/register'),
  login: (req,res) => res.render('auth/login'),
  post: {
    register: async (req,res) => {
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
          id: Date.now().toString(),
          username: req.body.username,
          password: hashedPassword
        })
        res.redirect('/auth/login')
      } catch {
        res.redirect('/auth/register')
      }
      console.log(users)
    },
    login: passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/auth/login',
      failureFlash: true
    })
  }
}