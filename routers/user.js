const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.use( (req,res,next) => {
  req.app.set('layout', 'layouts/user')  
  next()
})

router.get('/', userController.index )
router.get('/profile', userController.profile )

module.exports = router