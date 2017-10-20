exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('groups', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.text('description');
      table
        .integer('owner_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('cascade');
    })
    .finally(function() {
      knex.destroy();
    });
};

exports.down = function(knex, Promise) {
  if (process.env.NODE_ENV !== 'production') {
    return knex.schema.dropTableIfExists('groups').finally(function() {
      knex.destroy();
    });
  }
};
