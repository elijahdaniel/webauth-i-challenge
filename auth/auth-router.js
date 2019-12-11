const router = require('express').Router()
const bcrypt = require('bcryptjs')
const authorize = require('./auth-required-middleware.js')
const Users = require('../users/users-model.js')

router.post('/register', (req, res) => {
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 8)
  user.password = hash

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

router.post('/login', authorize, (req, res) => {
  let { username } = req.headers
  res.status(200).json({ message: `Welcome ${username}!` })
})

module.exports = router
