const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const config = require('config');
const db = require('../../db/').users;

const options = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.get('jwtSecret'),
};

passport.use(
  new Strategy(options, async function(jwtPayload, done) {
    try {
      const user = await db.findById(jwtPayload.id);

      if (!user) return done(null, false);

      return done(null, user);
    } catch (error) {
      done(error);
    }
  })
);
