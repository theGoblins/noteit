const pg = require("pg");
postgresql://[user[:password]@][netloc][:port][/dbname][?param1=value1&...]

const credentials = {
  user: 'aupadlon',
  pass: 'R9jDOCvYOaWQN_KEVFDez3UOVzV2tRIb',
  host: 'elmer.db.elephantsql.com',
  port: '5432',
  dbName: 'aupadlon'
}

const connectionString = `postgres://${credentials.user}:${credentials.pass}@${credentials.host}:${credentials.port}/${credentials.dbName}`;
const client = new pg.Client({ connectionString });

module.exports = {
  client
};
