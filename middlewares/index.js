const env = process.env.NODE_ENV;

const handlersList = [
  env === 'development' && 'logger',
  'errors',
  'bodyParser',
  'passportInitialize',
];

module.exports = handlersList.reduce((acc, handler) => {
  return handler ? [...acc, require(`./${handler}`)] : acc;
}, []);
