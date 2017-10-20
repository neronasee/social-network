exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('users_groups', function(table) {
      table.increments('id').primary();
      table
        .integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('cascade');
      table
        .integer('group_id')
        .notNullable()
        .references('id')
        .inTable('groups')
        .onDelete('cascade');
      table.unique(['user_id', 'group_id']);
    })
    .finally(function() {
      knex.destroy();
    });
};
exports.down = function(knex, Promise) {
  if (process.env.NODE_ENV !== 'production') {
    return knex.schema.dropTableIfExists('users_groups').finally(function() {
      knex.destroy();
    });
  }
};
