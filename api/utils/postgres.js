const { Client } = require('pg');

let client;
const connectionString = 'postgres://lqbelykr:IKBvEmsmPVU-0vJMDJgNH4BrqXA8EWle@flora.db.elephantsql.com/lqbelykr';

function postgresConnexion() {
  client = new Client(connectionString);

  client.connect((err) => {
    if (err) {
      console.error(err);
    }
  });

  client.query('SELECT NOW() AS "theTime"', (err, result) => {
    if (err) {
      console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
  });
  return client;
}

function getClient() {
  return client;
}

module.exports = {
  getClient,
  postgresConnexion,
};
