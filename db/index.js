const config = require('config');

const repos = {
  Users: require('./repos/users'),
};

const initOptions = {
  extend: obj => {
    obj.users = new repos.Users(obj, pgp);
  },
};

const confObj = config.get('dbConfig');

const pgp = require('pg-promise')(initOptions);
const db = pgp(confObj);

module.exports = db;
