/* eslint-disable quote-props */
// eslint-disable-next-line import/no-unresolved
const PocketBase = require('pocketbase/cjs');

const pb = new PocketBase('https://socialsync.hop.sh');

async function getInfluencers() {
  const listInfluencers = [];

  try {
    const influencersObject = await pb.collection('influencers').getFullList({
      sort: '+name',
    });

    influencersObject.forEach((influencer) => {
      listInfluencers.push(influencer.name);
    });
  } catch (error) {
    return error;
  }

  return listInfluencers;
}

module.exports = {
  getInfluencers,
};
