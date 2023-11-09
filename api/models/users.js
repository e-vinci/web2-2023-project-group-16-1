/* eslint-disable quote-props */
// eslint-disable-next-line import/no-unresolved
const PocketBase = require('pocketbase/cjs');

const pb = new PocketBase('https://pocketbasehop.hop.sh');

async function register(username, email, password, passwordConfirm) {
  const user = {
    'username': username,
    'email': email,
    'password': password,
    'passwordConfirm': passwordConfirm,
  };
  const record = await pb.collection('users').create(user);
  return record;
}

async function login(email, password) {
  const authData = await pb.collection('users').authWithPassword(email, password);
  return authData;
}

module.exports = {
  register,
  login,
};
