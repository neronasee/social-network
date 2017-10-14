const db = require('../db').users;
const _ = {
  isEmpty: require('lodash/isempty'),
};

exports.getSingle = async function(ctx, next) {
  const { id } = ctx.params;

  try {
    const user = await db.findById(id);

    if (!user) {
      ctx.throw(404, 'User not found');
    }

    ctx.body = { data: user };
  } catch (error) {
    if (error.name === 'NotFoundError') {
      ctx.throw(error);
    }
    ctx.throw(500);
  }
};

exports.getAll = async function(ctx, next) {
  const { offset = 0, limit = 50 } = ctx.request.query;

  try {
    const users = await db.findAll(offset, limit);
    ctx.body = { data: users };
  } catch (error) {
    console.log(error);
    ctx.throw(500);
  }
};

exports.update = async function(ctx, next) {
  if (_.isEmpty(ctx.request.body)) {
    ctx.throw(400, 'Provide data for update');
  }

  try {
    const result = await db.update(ctx.params.id, ctx.request.body);

    if (!result.rowCount) {
      ctx.throw(404, 'User not found');
    }

    ctx.body = 'OK';
  } catch (error) {
    if (error.name === 'NotFoundError') {
      ctx.throw(error);
    } else if (error.isJoi) {
      ctx.throw(400, error.message);
    } else {
      ctx.throw(500);
    }
  }
  // TODO: write case for password resaving with hashing
};

exports.delete = async function(ctx, next) {
  try {
    const result = await db.delete(ctx.params.id);

    if (!result.rowCount) {
      ctx.throw(404, 'User not found');
    }

    ctx.body = 'OK';
  } catch (error) {
    if (error.name === 'NotFoundError') {
      ctx.throw(error);
    }
    ctx.throw(500);
  }
};
