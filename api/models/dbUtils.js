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

async function getInfluencerInformation(idInfluenceur) {
  const dico = {};

  try {
    const influenceursObject = await pb.collection('influencers').getFullList({
      filter: `id = "${idInfluenceur}"`,
    });
    const influenceur = influenceursObject[0];
    dico.influencuer = influenceur;

    const listPlaforme = await pb.collection('platforms').getFullList({
      filter: '+name',
    });

    console.log(listPlaforme);

    const urls = await pb.collection('urls').getFullList({
      filter: `influenceur = "${idInfluenceur}"`,
    });

    console.log(urls);

    const platforms = {};
    listPlaforme.forEach((platform) => {
      urls.forEach((url) => {
        if (url.includes(platform.toLowerCase())) {
          platforms[platform.name] = url.url;
        }
      });
    });
    dico.platforms = platforms;
  } catch (error) {
    return error;
  }

  console.log(`dico = ${dico}`);
  return dico;
}

module.exports = {
  getInfluencerInformation,
  getInfluencers,
};
