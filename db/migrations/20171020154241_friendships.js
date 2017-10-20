exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('friendships', function(table) {
      table.increments('id').primary();
      table
        .integer('user_one_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('cascade');
      table
        .integer('user_two_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('cascade');
      table.unique(['user_one_id', 'user_two_id']);
    })
    .finally(function() {
      knex.destroy();
    });
};
exports.down = function(knex, Promise) {
  if (process.env.NODE_ENV !== 'production') {
    return knex.schema.dropTableIfExists('friendships').finally(function() {
      knex.destroy();
    });
  }
};
