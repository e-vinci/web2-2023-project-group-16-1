const { getClient, postgresConnexion } = require('../utils/postgres');

let client = getClient();
let currentUser;

async function register(email, username, password, passwordConfirm) {
  if (password !== passwordConfirm) {
    return undefined;
  }

  try {
    if (!client) {
      client = postgresConnexion();
    }

    const query = {
      text: 'SELECT projetWeb.register($1, $2, $3);',
      values: [username, email, password],
    };

    const res = await client.query(query);

    return res.rows;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

async function login(email, password) {
  try {
    if (!client) {
      client = postgresConnexion();
    }

    const query = {
      text: 'SELECT projetWeb.authanticate($1, $2);',
      values: [email, password],
    };

    const res = await client.query(query);
    const userId = res.rows[0].authanticate;

    const user = await setUser(userId);

    return user;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

async function setUser(idUser) {
  const query = {
    text: 'SELECT * FROM projetWeb.userInfo WHERE id_user = $1;',
    values: [idUser],
  };

  const res = await client.query(query);

  const user = res.rows[0];
  currentUser = user;

  return currentUser;
}

async function getCurrentUser() {
  return currentUser;
}

module.exports = {
  register,
  login,
  getCurrentUser,
};
