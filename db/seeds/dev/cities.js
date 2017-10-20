const faker = require('faker');

if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV not set');
}

if (process.env.NODE_ENV === 'production') {
  throw new Error('Cant run seeds in production');
}

exports.seed = async function(knex, Promise) {
  const seedData = [];

  for (let i = 1; i <= 100; i++) {
    seedData.push({ name: faker.address.city() });
  }

  // await knex('cities').truncate();

  await knex('cities').insert(seedData);

  knex.destroy();
};
