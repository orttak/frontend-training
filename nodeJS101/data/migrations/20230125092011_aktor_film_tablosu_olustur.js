/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('aktor',(table) => {
    table.increments(); // otomnatik name id ve primary oluyor
    table.string('isim',100 ).notNullable();  //second len of the parameter
  })
  .createTable('film', (table) => {
    table.increments()
    table.string('isim').notNullable()
  })
  .createTable('aktor_film', (table) => {
    table.increments();
    table.integer('film_id').unsigned();
    table.integer('aktor_id').unsigned();
    table.foreign('film_id').references('film.id').onUpdate('CASCADE').onDelete('CASCADE');
    table.foreign('aktor_id').references('aktor.id').onUpdate('CASCADE').onDelete('CASCADE');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('aktor_film')
    .dropSchemaIfExists('film')
    .dropTableIfExists('aktor')
  
};