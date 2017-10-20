module.exports = {
  port: 3000,
  secret: 'myscret',
  jwtSecret: '>TnB"j/8=`W^7NH8~:+ndJ}UdqfK,?^_',
  root: process.cwd(),
  rootUrl: 'http://localhost:3000',
  dbConfig: {
    dbHost: 'localhost',
    dbPort: '5432',
    database: 'social_network',
    dbUser: 'dev',
  },
};
// TODO: move secret and rootUrl to env var on prod server
