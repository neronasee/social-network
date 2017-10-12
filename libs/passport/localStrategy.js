const passport = require('passport');
const LocalStrategy = require('passport-local');
const db = require('../../db').users;

const localOptions = {
  usernameField: 'email',
};

passport.use(
  new LocalStrategy(localOptions, async function(email, password, done) {
    try {
      const user = await db.findByEmail(email);

      if (!user) return done(null, false);

      const isMatch = await db.comparePassword(email, password);

      if (!isMatch) return done(null, false);

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);
