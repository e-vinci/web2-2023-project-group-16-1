const { Client } = require('pg');

let client;

function postgresConnexion() {
  client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '',
    port: 5432,
  });

  client.connect();

  return client;
}

function getClient() {
  return client;
}

module.exports = {
  getClient,
  postgresConnexion,
};
