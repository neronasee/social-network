const pgp = require('pg-promise')();
const faker = require('faker');
const db = pgp('postgres://sashavorona@localhost:5432/social_network');

for (let i = 1; i <= 100; i++) {
  db.none('INSERT INTO cities(name) VALUES($1)', [faker.address.city()])
    .then(() => {})
    .catch((error) => {
      console.log('ERROR:', error); // print error;
    });
}
pgp.end();
