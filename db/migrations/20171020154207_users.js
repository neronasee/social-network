exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('users', function(table) {
      table.increments('id').primary();
      table.string('password_hash').notNullable();
      table
        .string('email')
        .notNullable()
        .unique();
      table.string('firstname').notNullable();
      table.string('lastname').notNullable();
      table.string('phone').notNullable();
      table.integer('gender').notNullable();
      table
        .integer('city_id')
        .notNullable()
        .references('id')
        .inTable('cities')
        .onDelete('set null');
      table.date('birthdate').notNullable();
    })
    .finally(function() {
      knex.destroy();
    });
};

exports.down = function(knex, Promise) {
  if (process.env.NODE_ENV !== 'production') {
    return knex.schema.dropTableIfExists('users').finally(function() {
      knex.destroy();
    });
  }
};
