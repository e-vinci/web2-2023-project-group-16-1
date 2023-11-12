/* eslint-disable quote-props */
// eslint-disable-next-line import/no-unresolved
const PocketBase = require('pocketbase/cjs');

const pb = new PocketBase('https://socialsync.hop.sh');

const { getCurrentUser } = require('./auths');

// eslint-disable-next-line no-unused-vars
async function subscribe(url) {
  const urlObject = await pb.collection('urls').getFullList({
    filter: `url = "${url}"`,
  });

  const currentUser = await getCurrentUser();

  const data = {
    user: currentUser.record.id,
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
