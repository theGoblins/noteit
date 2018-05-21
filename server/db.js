const pg = require("pg");
const connectionString =
  "postgres://aupadlon:R9jDOCvYOaWQN_KEVFDez3UOVzV2tRIb@elmer.db.elephantsql.com:5432/aupadlon";
const client = new pg.Client({ connectionString });

module.exports = {
  client
};
