const { getClient, postgresConnexion } = require('../utils/postgres');
const { getCurrentUser } = require('./auths');

let client = getClient();

async function subscribe(influencer, platform) {
  try {
    if (!client) {
      client = postgresConnexion();
    }

    const query = {
      text: 'SELECT projetWeb.subscribeTo($1, $2, $3);',
      values: [getCurrentUser().id_user, influencer, platform],
    };

    const res = await client.query(query);

    return res;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

async function unSubscribe(influencer, platform) {
  try {
    if (!client) {
      client = postgresConnexion();
    }

    const query = {
      text: 'SELECT projetWeb.projetWeb.unSubscribe($1, $2, $3);',
      values: [getCurrentUser().id_user, influencer, platform],
    };

    const res = await client.query(query);

    return res;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

async function getSubscriptions() {
  try {
    if (!client) {
      client = postgresConnexion();
    }

    const query = {
      text: 'SELECT * FROM projetWeb.listSubscription WHERE id_user = $1;',
      values: [getCurrentUser().id_user],
    };

    const res = await client.query(query);

    return res;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

module.exports = {
  subscribe,
  unSubscribe,
  getSubscriptions,
};
