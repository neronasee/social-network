const sql = require('../sql/').groups;
const validateData = require('../utils/validateData');
const createSchema = require('../validationSchemas/groups/create');
const updateSchema = require('../validationSchemas/groups/update');
const makeUpdateQuery = require('../utils/makeUpdateQuery');

class GroupsRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
    this.tableName = 'groups';
  }

  findById(groupId) {
    return this.db.oneOrNone(sql.findById, groupId);
  }

  findAll(offset, limit) {
    return this.db.any(sql.findAll, { offset, limit });
  }

  create(values) {
    return new Promise((resolve, reject) => {
      const validatedData = validateData(values, createSchema);

      if (validatedData.error) return reject(validatedData.error);

      resolve(this.db.one(sql.create, validatedData.value));
    });
  }

  update(id, values) {
    return new Promise((resolve, reject) => {
      const validatedData = validateData(values, updateSchema);

      if (validatedData.error) return reject(validatedData.error);

      const query = makeUpdateQuery(validatedData.value, this.tableName);
      const dataWithId = Object.assign({}, validatedData.value, { id });

      resolve(this.db.result(query, dataWithId));
    });
  }

  delete(id) {
    return this.db.result(sql.delete, id);
  }

  empty() {
    return this.db.none(sql.empty);
  }

  getUsers(userId) {
    return this.db.any(sql.getUsers, userId);
  }

  addUserToGroup(userId, groupId) {
    return this.db.result(sql.addUserToGroup, { user_id: userId, group_id: groupId });
  }

  deleteUserFromGroup(userId, groupId) {
    return this.db.result(sql.deleteUserFromGrouo, { user_id: userId, group_id: groupId });
  }
}
module.exports = GroupsRepository;
