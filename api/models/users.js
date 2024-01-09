const { getClient, postgresConnexion } = require('../utils/postgres');

let client = getClient();

async function subscribe(userId, influencer, platform) {
  try {
    if (!client) {
      client = postgresConnexion();
    }

    const query = {
      text: 'SELECT projetWeb.subscribeTo($1, $2, $3);',
      values: [userId, influencer, platform],
    };

    const res = await client.query(query);

    return res;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

async function unSubscribe(userId, influencer, platform) {
  try {
    if (!client) {
      client = postgresConnexion();
    }

    const query = {
      text: 'SELECT projetWeb.unSubscribe($1, $2, $3);',
      values: [userId, influencer, platform],
    };

    const res = await client.query(query);

    return res.rows[0];
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

async function getSubscriptions(userId) {
  try {
    if (!client) {
      client = postgresConnexion();
    }

    const query = {
      text: 'SELECT * FROM projetWeb.listSubscription WHERE id_user = $1;',
      values: [userId],
    };

    const res = await client.query(query);

    const listSubscription = res.rows;

    return listSubscription;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

async function deleteUser(userId) {
  try {
    if (!client) {
      client = postgresConnexion();
    }

    const query = {
      text: 'SELECT * FROM projetWeb.deleteUser($1);',
      values: [userId],
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
  deleteUser,
};
