const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const authMiddlewares = require('./app/middlewares/auth')
const guestMiddlewares = require('./app/middlewares/guest')

const UserController = require('./app/controller/UserController')
const SessionController = require('./app/controller/SessionController')
const DashboardController = require('./app/controller/DashboardController')
const FileController = require('./app/controller/FileController')
const AppointmentController = require('./app/controller/AppointmentController')
const AvailableController = require('./app/controller/AvailableController')
const ScheduleController = require('./app/controller/ScheduleController')

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')

  next()
})

routes.get('/files/:file', FileController.show)

routes.get('/', guestMiddlewares, SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', guestMiddlewares, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

routes.use('/app', authMiddlewares)

routes.get('/app/logout', SessionController.destroy)

routes.get('/app/dashboard', DashboardController.index)

routes.get('/app/appointments/new/:provider', AppointmentController.create)
routes.post('/app/appointments/new/:provider', AppointmentController.store)
routes.get('/app/available/:provider', AvailableController.index)

routes.get('/app/schedule', ScheduleController.index)

module.exports = routes
