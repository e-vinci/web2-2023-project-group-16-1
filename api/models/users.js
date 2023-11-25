/* eslint-disable quote-props */
// eslint-disable-next-line import/no-unresolved
const PocketBase = require('pocketbase/cjs');

const pb = new PocketBase('https://socialsync.hop.sh');

const { getCurrentUser } = require('./auths');

async function subscribe(url) {
  const urlObject = await pb.collection('urls').getFullList({
    filter: `url = "${url}"`,
  });

  const currentUser = await getCurrentUser();

  const data = {
    user: currentUser.id,
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

async function unSubscribe(url) {
  const urlObject = await pb.collection('urls').getFullList({
    filter: `url = "${url}"`,
  });

  const currentUser = await getCurrentUser();

  const data = {
    user: currentUser.id,
    url: urlObject[0].id,
  };

  const subscriptionObject = await pb.collection('subscriptions').getFullList({
    filter: `url = "${data.url}" && user = "${data.user}"`,
  });

  let record;

  try {
    record = await pb.collection('subscriptions').delete(
      subscriptionObject[0].id,
    );
  } catch (error) {
    return error;
  }

  return record;
}

module.exports = {
  subscribe,
  unSubscribe,
};
