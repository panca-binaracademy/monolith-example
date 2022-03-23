const router = require('express').Router()
const auth = require('../controllers/auth')

router.get('/register', auth.register)
router.post('/register', auth.post.register)
router.get('/login', auth.login)
router.post('/login', auth.post.login)

module.exports = router