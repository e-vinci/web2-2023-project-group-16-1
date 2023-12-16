const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getClient, postgresConnexion } = require('../utils/postgres');

const jwtSecret = 'NicoTitiEfe';
const lifetimeJwt = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h

const saltRounds = 10;

let client = getClient();

async function register(email, username, password) {
  try {
    if (!client) {
      client = postgresConnexion();
    }

    const pwdHash = await bcrypt.hash(password, saltRounds);

    const query = {
      text: 'SELECT projetWeb.register($1, $2, $3);',
      values: [username, email, pwdHash],
    };

    const res = await client.query(query);

    return res.rows;
  } catch (err) {
    return undefined;
  }
}

async function login(email, password) {
  try {
    if (!client) {
      client = postgresConnexion();
    }

    const query = {
      text: 'SELECT * FROM projetWeb.userAuth WHERE email = $1;',
      values: [email],
    };

    const res = await client.query(query);
    const user = res.rows[0];

    const passwordMatch = await bcrypt.compare(password, user.mdp_hash);
    if (!passwordMatch) {
      return undefined;
    }

    const token = jwt.sign(
      { id: user.id_user }, // session data added to the payload (payload : part 2 of a JWT)
      jwtSecret, // secret used for the signature (signature part 3 of a JWT)
      { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
    );

    const authenticatedUser = {
      username: user.username,
      token,
    };

    return authenticatedUser;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

module.exports = {
  register,
  login,
};
