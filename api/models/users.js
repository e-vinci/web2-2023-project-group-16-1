const { getClient, postgresConnexion } = require('../utils/postgres');

let client = getClient();

async function subscribe(influencer, platform) {
  try {
    if (!client) {
      client = postgresConnexion();
    }

    const user = await getCurrentUser();

    const query = {
      text: 'SELECT projetWeb.subscribeTo($1, $2, $3);',
      values: [user.id_user, influencer, platform],
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
    const user = await getCurrentUser();

    const query = {
      text: 'SELECT projetWeb.unSubscribe($1, $2, $3);',
      values: [user.id_user, influencer, platform],
    };

    const res = await client.query(query);

    return res.rows[0];
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
    const user = await getCurrentUser();

    const query = {
      text: 'SELECT * FROM projetWeb.listSubscription WHERE id_user = $1;',
      values: [user.id_user],
    };

    const res = await client.query(query);

    const listSubscription = res.rows;

    return listSubscription;
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
