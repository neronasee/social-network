const db = require('../db').groups;
const config = require('config');
const _ = {
  isEmpty: require('lodash/isempty'),
};

exports.getSingle = async function(ctx, next) {
  const { id } = ctx.params;

  if (!Number.isInteger(+id)) {
    ctx.throw(400, 'Provide proper id');
  }

  try {
    const group = await db.findById(id);

    if (!group) {
      ctx.throw(404, 'Group not found');
    }

    const populatedInfo = Object.assign({}, group, {
      owner: `${config.get('rootUrl')}/users/${group.owner_id}`,
    });

    ctx.body = { data: populatedInfo };
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
    const groups = await db.findAll(offset, limit);

    ctx.body = { data: groups };
  } catch (error) {
    ctx.throw(500);
  }
};

exports.create = async function(ctx, next) {
  const groupInfo = ctx.request.body;

  try {
    const group = await db.create(groupInfo);

    ctx.body = { data: group };
  } catch (error) {
    if (error.isJoi) {
      ctx.throw(400, error.message);
    }
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
      ctx.throw(404, 'Group not found');
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
};

exports.delete = async function(ctx, next) {
  try {
    const result = await db.delete(ctx.params.id);

    if (!result.rowCount) {
      ctx.throw(404, 'Group not found');
    }

    ctx.body = 'OK';
  } catch (error) {
    if (error.name === 'NotFoundError') {
      ctx.throw(error);
    }
    ctx.throw(500);
  }
};

exports.getUsers = async function(ctx, next) {
  const { id } = ctx.params;

  if (!Number.isInteger(+id)) {
    ctx.throw(400, 'Provide proper id');
  }

  try {
    const groups = await db.getUsers(id);

    if (!groups.length) {
      ctx.throw(404, 'No users or group doesnt exist');
    }

    ctx.body = { data: groups };
  } catch (error) {
    if (error.name === 'NotFoundError') {
      ctx.throw(error);
    }
    console.log(error);
    ctx.throw(500);
  }
};

exports.addUserToGroup = async function(ctx, next) {
  const { userId, groupId } = ctx.params;

  if (!Number.isInteger(+userId) || !Number.isInteger(+groupId)) {
    ctx.throw(400, 'Provide proper ids');
  }

  try {
    await db.addUserToGroup(userId, groupId);

    ctx.body = 'OK';
  } catch (error) {
    // code of foreign key violating (key is not present in corresponding table)
    if (error.code === '23503') {
      ctx.throw(404, 'User or group doesnt exist');
    }
    // already a member
    if (error.code === '23505') {
      ctx.throw(400, 'Already a member');
    }
    ctx.throw(500);
  }
};

exports.deleteUserFromGroup = async function(ctx, next) {
  const { userId, groupId } = ctx.params;

  if (!Number.isInteger(+userId) || !Number.isInteger(+groupId)) {
    ctx.throw(400, 'Provide proper ids');
  }

  try {
    const result = await db.deleteUserFromGroup(userId, groupId);

    if (!result.rowCount) {
      ctx.throw(404, 'User/Group not found or they are not related to each other');
    }

    ctx.body = 'OK';
  } catch (error) {
    if (error.name === 'NotFoundError') {
      ctx.throw(error);
    }
    ctx.throw(500);
  }
};
