const session = require('express-session') // required to use connect-session-knex
const knexSessionStore = require('connect-session-knex')(session)
const apiRouter = require('./api-router.js')
const configureMiddleware = require('./configure-middleware.js')

const express = require('express')

const server = express()

configureMiddleware(server)

const sessionOptions = {
  name: 'mycookie',
  secret: 'cookiesareyumyummewantcookies',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false,

  store: new knexSessionStore({
    knex: require('../database/dbConfig.js'),
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
}

server.use('/api', apiRouter)
server.use(session(sessionOptions))

server.get('/', (req, res) => res.send('server is running'))

module.exports = server
