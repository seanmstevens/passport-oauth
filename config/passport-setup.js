const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys')
const User = require('../models/User')

passport.use(
  new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    const { id, displayName } = profile

    User.findOne({
      googleId: id
    }).then(record => {
      if (record) {
        // user already exists
        console.log(`User ${record.username} already exists`)
      } else {
        // if it's a new user
        new User({
          username: displayName,
          googleId: id
        }).save()
          .then(record => console.log('user added to database', record))
          .catch(err => console.error(err))
      }
    })
  })
)
