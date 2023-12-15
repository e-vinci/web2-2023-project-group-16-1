const { getClient, postgresConnexion } = require('../utils/postgres');

let client = getClient();

async function getInfluencers() {
  const influencerList = [];
  try {
    if (!client) {
      client = postgresConnexion();
    }

    const query = {
      text: 'SELECT * FROM projetWeb.allInfluencers;',
    };

    const res = await client.query(query);

    res.rows.forEach((influencerObject) => {
      influencerList.push(influencerObject.nom);
    });
  } catch (err) {
    console.error(err);
  }
  return influencerList;
}

async function getInfluencerInformation(idInfluenceur) {
  let influencerInfo = {};
  const platformList = [];

  try {
    if (!client) {
      client = postgresConnexion();
    }

    const query = {
      text: 'SELECT * FROM projetWeb.infoInfluencer WHERE id_influencer = $1;',
      values: [idInfluenceur],
    };

    const res = await client.query(query);

    influencerInfo = {
      idInfluencer: res.rows[0].id_influencer,
      name: res.rows[0].influencer,
      description: res.rows[0].description,
    };

    res.rows.forEach((influencerObject) => {
      platformList.push(influencerObject.platform);
    });
  } catch (err) {
    console.error(err);
  }
  influencerInfo.platforms = platformList;

  return influencerInfo;
}

module.exports = {
  getInfluencerInformation,
  getInfluencers,
};
