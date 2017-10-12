const sql = require('../sql/').users;
const bcrypt = require('bcrypt-nodejs');

class UsersRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  create(values) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(values.password, null, null, (err, hash) => {
        if (err) return reject(err);

        resolve(
          this.db.one(sql.create, {
            firstname: values.firstname,
            lastname: values.lastname,
            birthdate: values.birthdate,
            phone: values.phone,
            gender: values.gender,
            city_id: values.city_id,
            password_hash: hash,
            email: values.email,
          })
        );
      });
    });
  }

  findById(userId) {
    return this.db.oneOrNone(sql.findById, userId);
  }

  findByEmail(email) {
    return this.db.oneOrNone(sql.findByEmail, email);
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
