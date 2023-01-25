module.exports = {
    development: {
      client: "pg",
      connection: {
        database: "film",
        user: "postgres",
        password: "postgres",
      },
      migrations: {
        directory: "./data/migrations",
      },
      seeds: {
        directory: "./data/seeds",
      },
    },
    // deployment to real server 
    production: {},
  };