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
      influencerList.push(influencerObject);
    });

    return influencerList;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

async function getInfluencerInformation(idInfluenceur) {
  const platformList = [];
  const urlList = [];

  try {
    if (!client) {
      client = postgresConnexion();
    }

    const query = {
      text: 'SELECT * FROM projetWeb.infoInfluencer WHERE id_influencer = $1;',
      values: [idInfluenceur],
    };

    const res = await client.query(query);

    const influencerInfo = {
      idInfluencer: res.rows[0].id_influencer,
      name: res.rows[0].influencer,
      description: res.rows[0].description,
    };

    res.rows.forEach((influencerObject) => {
      platformList.push(influencerObject.platform);
      urlList.push(influencerObject.url);
    });

    influencerInfo.platforms = platformList;
    influencerInfo.urls = urlList;

    return influencerInfo;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

async function getPlatform() {
  const platformList = [];
  try {
    if (!client) {
      client = postgresConnexion();
    }

    const query = {
      text: 'SELECT * FROM projetWeb.allPlatforms;',
    };

    const res = await client.query(query);

    return res.rows;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

module.exports = {
  getInfluencerInformation,
  getInfluencers,
  getPlatform,
};
