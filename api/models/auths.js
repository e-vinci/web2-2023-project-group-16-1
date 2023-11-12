/* eslint-disable quote-props */
// eslint-disable-next-line import/no-unresolved
const PocketBase = require('pocketbase/cjs');

const pb = new PocketBase('https://socialsync.hop.sh');

async function register(username, email, password, passwordConfirm) {
  const user = {
    username,
    email,
    password,
    passwordConfirm,
  };

  let record;
  try {
    record = await pb.collection('users').create(user);
  } catch (error) {
    return error;
  }

  return record;
}

async function login(email, password) {
  let authData;
  try {
    authData = await pb.collection('users').authWithPassword(email, password);
  } catch (error) {
    return error;
  }

  return authData;
}

module.exports = {
  register,
  login,
};
