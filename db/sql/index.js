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
    empty: sql('users/empty.sql'),
    findById: sql('users/findById.sql'),
    findByEmail: sql('users/findByEmail.sql'),
    hashByEmail: sql('users/hashByEmail.sql'),
  },
};
