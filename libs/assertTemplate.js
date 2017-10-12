const _ = {
  every: require('lodash/every'),
  has: require('lodash/has'),
};

module.exports = (template, infoForAssertion) =>
  _.every(template, prop => _.has(infoForAssertion, prop));
