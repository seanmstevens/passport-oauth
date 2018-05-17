const express = require('express')
const authRoutes = require('./routes/auth-routes')
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const { db: { dbURI } } = require('./config/keys')

const app = express()
app.set('view engine', 'ejs')

mongoose.connect(dbURI, () => {
  console.log('Connected to database')
})

app.use('/auth', authRoutes)

app.get('/', (req, res) => {
  res.render('home')
})

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})