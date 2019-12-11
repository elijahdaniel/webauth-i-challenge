const router = require('express').Router()

const authRouter = require('../auth/auth-router.js')
const usersRouter = require('../users/users-router.js')

// bound to /api/auth
router.use('/auth', authRouter)
// bound to /api/users
router.use('/users', usersRouter)

// bound to /api
router.get('/', (req, res) => {
  res.json({ api: "It's alive" })
})

module.exports = router
