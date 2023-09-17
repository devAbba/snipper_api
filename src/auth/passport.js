const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const db = require('../database/models');
const bcrypt = require('bcrypt');

const User = db.User

//Persists user data inside session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//Fetches session details using session id
passport.deserializeUser(async(id, done) => {
  const user = await User.findByPk(id)
  if (!user) return done(err, null)
  return done(null, user.id)
});

passport.use(new localStrategy({usernameField: 'email'}, async function verify(email, password, cb) {
    
  const user = await User.findOne({where: {'email': email}})
  if (!user) return cb(null, false, { message: 'Incorrect username or password.'})

  bcrypt.compare(password, user.password, function(err, result){
      if (err) return cb(err)
      if (result === false) return cb(null, false, { message: 'Incorrect username or password.'})
      
      return cb(null, user)
  })

}));

