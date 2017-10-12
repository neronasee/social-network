const db = require('../db').users;
const assertTemplate = require('../libs/assertTemplate');
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
  const template = [
    'firstname',
    'lastname',
    'birthdate',
    'phone',
    'gender',
    'city_id',
    'password',
    'email',
  ];

  const isValid = assertTemplate(template, userInfo);

  if (!isValid) ctx.throw(422, 'Provide all data needed');

  const existingUser = await db.findByEmail(userInfo.email);

  if (existingUser) ctx.throw(409, 'User aready exists');

  try {
    const user = await db.create(userInfo);
    const token = tokenForUser(user);

    ctx.body = {
      user,
      token,
    };
  } catch (e) {
    ctx.throw(400, 'Provide proper data');
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
