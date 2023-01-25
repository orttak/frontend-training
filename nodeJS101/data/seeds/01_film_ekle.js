/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('film').del()
  await knex('film').insert([
    {id: 1, isim: 'Tosun Pasa'},
    {id: 2, isim: 'Eskiya'},
    {id: 3, isim: 'Neseli Gunler'}
  ]);
};