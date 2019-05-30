const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const authMiddlewares = require('./app/middlewares/auth')
const guestMiddlewares = require('./app/middlewares/guest')

const UserController = require('./app/controller/UserController')
const SessionController = require('./app/controller/SessionController')

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')

  next()
})

routes.get('/', guestMiddlewares, SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', guestMiddlewares, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

routes.use('/app', authMiddlewares)

routes.get('/app/logout', SessionController.destroy)

routes.get('/app/dashboard', (req, res) => {
  console.log(req.session.user)
  return res.render('dashboard')
})

module.exports = routes
