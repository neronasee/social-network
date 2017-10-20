exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('cities', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
    })
    .finally(function() {
      knex.destroy();
    });
};

exports.down = function(knex, Promise) {
  if (process.env.NODE_ENV !== 'production') {
    return knex.schema.dropTableIfExists('cities').finally(function() {
      knex.destroy();
    });
  }
};
