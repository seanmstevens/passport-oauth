const express = require('express')
const authRoutes = require('./routes/auth-routes')
const profileRoutes = require('./routes/profile-routes')
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const { db: { dbURI }, session: { cookieKey } } = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')

const app = express()
app.set('view engine', 'ejs')

app.use(cookieSession({
  maxAge: 7 * 24 * 60 * 60 * 1000,
  keys: [cookieKey]
}))

app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(dbURI, () => {
  console.log('Connected to database')
})

app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)

app.get('/', (req, res) => {
  res.render('home')
})

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})