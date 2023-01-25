const knex = require ('knex')

const knexfile = require ('../knexfile');

const environment = process.env.NODE_ENV || 'development';

// read the knexfile.js and export the configuration object for the environment
module.exports = knex(knexfile[environment]);

