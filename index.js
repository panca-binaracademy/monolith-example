const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const routers = require('./routers')

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use( (req, res, next) => {
  req.app.set('layout','layouts/default')
  next()
})

app.get('/', (req,res) => res.render('index'))
app.use('/user/', routers.user)

app.listen()