const router = require('express').Router()
const auth = require('../controllers/auth')

router.get('/login', auth.login)
router.post('/password', auth.password)

module.exports = router