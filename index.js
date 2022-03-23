global.users = []

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const routers = require('./routers')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: 'fejsbinar',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use( (req, res, next) => {
  req.app.set('layout','layouts/default')
  next()
})

app.get('/', (req,res) => {
  console.log(req.user)
  console.log(req.isAuthenticated())
  res.render('index')
})
app.use('/user/', routers.user)
app.use('/auth/', routers.auth)

app.listen()