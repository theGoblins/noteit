const pg = require('pg');

const credentials = {
  host: 'elmer.db.elephantsql.com',
  port: 5432,
  user: 'aupadlon',
  password: 'R9jDOCvYOaWQN_KEVFDez3UOVzV2tRIb',
  database: 'aupadlon'
};

const client = new pg.Client(credentials);

module.exports = client;
