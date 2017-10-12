module.exports = {
  port: 3000,
  secret: 'myscret',
  jwtSecret: '>TnB"j/8=`W^7NH8~:+ndJ}UdqfK,?^_',
  root: process.cwd(),
  dbConfig: {
    dbHost: 'localhost',
    dbPort: '5432',
    database: 'social_network',
    dbUser: 'postgres',
  },
};
// TODO: move secret to env var on prod server
