const jwt = require('jsonwebtoken');
const { getClient, postgresConnexion } = require('../utils/postgres');

const jwtSecret = 'tmtcpoto!';
const lifetimeJwt = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h

let client = getClient();

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

    if (!user) {
      return undefined;
    }
    console.log(user);

    const token = jwt.sign(
      { id: user.id_user }, // session data added to the payload (payload : part 2 of a JWT)
      jwtSecret, // secret used for the signature (signature part 3 of a JWT)
      { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
    );

    const authenticatedUser = {
      username: user.username,
      token,
    };

    console.log(authenticatedUser);

    return authenticatedUser;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

async function setUser(idUser) {
  try {
    const query = {
      text: 'SELECT * FROM projetWeb.userInfo WHERE id_user = $1;',
      values: [idUser],
    };
    const res = await client.query(query);

    const user = res.rows[0];

    return user;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

module.exports = {
  register,
  login,
};
