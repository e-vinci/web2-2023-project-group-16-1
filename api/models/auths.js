/* eslint-disable quote-props */
// eslint-disable-next-line import/no-unresolved
const PocketBase = require('pocketbase/cjs');

const pb = new PocketBase('https://socialsync.hop.sh');

let currentUser;

async function register(email, username, password, passwordConfirm) {
  if (password !== passwordConfirm) {
    return undefined;
  }

  const user = {
    email,
    username,
    password,
    passwordConfirm,
  };

  let record;
  try {
    record = await pb.collection('users').create(user);
  } catch (error) {
    console.log(error);

    return undefined;
  }
  return record;
}

async function login(email, password) {
  let authData;
  try {
    authData = await pb.collection('users').authWithPassword(email, password);
    currentUser = pb.authStore.model;
  } catch (error) {
    return error;
  }
  return authData;
}

async function getCurrentUser() {
  return currentUser;
}

module.exports = {
  register,
  login,
  getCurrentUser,
};
