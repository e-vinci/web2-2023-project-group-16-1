/* eslint-disable quote-props */
// eslint-disable-next-line import/no-unresolved
const PocketBase = require('pocketbase/cjs');

const pb = new PocketBase('https://socialsync.hop.sh');

// eslint-disable-next-line no-unused-vars
async function subscribe(username, url) {
  const userObject = await pb.collection('users').getFullList({
    filter: `username = "${username}"`,
  });

  const urlObject = await pb.collection('urls').getFullList({
    filter: `url = "${url}"`,
  });

  const data = {
    user: userObject[0].id,
    url: urlObject[0].id,
  };

  let record;
  try {
    record = await pb.collection('subscriptions').create(data);
  } catch (error) {
    return error;
  }

  return record;
}

module.exports = {
  subscribe,
};
