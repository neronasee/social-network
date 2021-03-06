const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

function sql(file) {
  const fullPath = path.join(__dirname, file);
  const options = {
    minify: true,
    params: {
      schema: 'public',
    },
  };

  const qf = new QueryFile(fullPath, options);

  if (qf.error) {
    console.error(qf.error);
  }

  return qf;
}

module.exports = {
  users: {
    create: sql('users/create.sql'),
    delete: sql('users/delete.sql'),
    empty: sql('users/empty.sql'),
    findAll: sql('users/findAll.sql'),
    findById: sql('users/findById.sql'),
    findByEmail: sql('users/findByEmail.sql'),
    hashByEmail: sql('users/hashByEmail.sql'),
    getGroups: sql('users/getGroups.sql'),
  },
  groups: {
    findById: sql('groups/findById.sql'),
    findAll: sql('groups/findAll.sql'),
    create: sql('groups/create.sql'),
    delete: sql('groups/delete.sql'),
    empty: sql('groups/empty.sql'),
    getUsers: sql('groups/getUsers.sql'),
    addUserToGroup: sql('groups/addUserToGroup.sql'),
    deleteUserFromGrouo: sql('groups/deleteUserFromGroup.sql'),
  },
};
