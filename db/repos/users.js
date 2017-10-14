const sql = require('../sql/').users;
const bcrypt = require('bcrypt-nodejs');
const validateData = require('../utils/validateData');
const createSchema = require('../validationSchemas/users/create');
const updateSchema = require('../validationSchemas/users/update');
const makeUpdateQuery = require('../utils/makeUpdateQuery');

class UsersRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
    this.tableName = 'users';
  }

  create(values) {
    return new Promise((resolve, reject) => {
      const validatedData = validateData(values, createSchema);

      if (validatedData.error) return reject(validatedData.error);

      const { firstname, lastname, birthdate, phone, gender, city_id, email } = validatedData.value;

      bcrypt.hash(values.password, null, null, (err, hash) => {
        if (err) return reject(err);

        resolve(
          this.db.one(sql.create, {
            firstname,
            lastname,
            birthdate,
            phone,
            gender,
            city_id,
            password_hash: hash,
            email,
          })
        );
      });
    });
  }

  findAll(offset, limit) {
    return this.db.any(sql.findAll, { offset, limit });
  }

  findById(userId) {
    return this.db.oneOrNone(sql.findById, userId);
  }

  findByEmail(email) {
    return this.db.oneOrNone(sql.findByEmail, email);
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

  comparePassword(email, password) {
    return new Promise((resolve, reject) => {
      this._getPasswordHash(email)
        .then(response => {
          bcrypt.compare(password, response.password_hash, (err, isMatch) => {
            if (err) return reject(err);

            resolve(isMatch);
          });
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  _getPasswordHash(email) {
    return this.db.oneOrNone(sql.hashByEmail, email);
  }
}
module.exports = UsersRepository;
