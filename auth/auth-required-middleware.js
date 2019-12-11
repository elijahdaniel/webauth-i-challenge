const users = require('../users/users-model.js')
const bcrypt = require('bcryptjs')

module.exports = (req, res, next) => {
  // look for the credentials
  const { username, password } = req.headers
  // validate that they exist ... we didn't have this part in class...
  if (!(username && password)) {
    res.status(401).json({ message: 'invalid credentials' })
  } else {
    // find the user in the DB
    users
      .findBy({ username })
      .first()
      .then(_user => {
        if (_user && bcrypt.compareSync(password, _user.password)) {
          next()
        } else {
          res.status(401).json({ messege: 'Invalid Credentials' })
        }
      })
      .catch(err => {
        res.status(500).json({ messege: err })
      })
  }
}
