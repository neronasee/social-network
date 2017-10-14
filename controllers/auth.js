const db = require('../db').users;
const config = require('config');
const jwt = require('jwt-simple');
const passport = require('koa-passport');

const tokenForUser = user => {
  const payload = {
    id: user.id,
    email: user.email,
  };

  return jwt.encode(payload, config.get('jwtSecret'));
};

exports.signUp = async function(ctx, next) {
  const userInfo = ctx.request.body;

  try {
    const existingUser = await db.findByEmail(userInfo.email);

    if (existingUser) {
      ctx.throw(400, 'User with this email aready exists');
    }

    const user = await db.create(userInfo);
    const token = tokenForUser(user);

    ctx.body = {
      user,
      token,
    };
  } catch (error) {
    if (error.isJoi) {
      ctx.throw(400, error.message);
    } else if (error.name === 'BadRequestError') {
      ctx.throw(error);
    } else {
      ctx.throw(500);
    }
  }
};

exports.login = async function(ctx, next) {
  await passport.authenticate('local', { session: false })(ctx, next);
  if (ctx.state.user) {
    const token = tokenForUser(ctx.state.user);
    ctx.body = { token };
  } else {
    ctx.throw(400, 'No such user or password is incorrect');
  }
};
