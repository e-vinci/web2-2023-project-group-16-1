/* eslint-disable max-len */
const express = require('express');
const { getInfluencers, getInfluencerInformation } = require('../models/dbUtils');

const router = express.Router();

router.get('/', async (req, res) => {
  const listInfluencers = await getInfluencers();

  if (!listInfluencers) return res.sendStatus(500);

  return res.json(listInfluencers);
});

router.get('/:id', async (req, res) => {
  const influencerInfo = await getInfluencerInformation(req?.params?.id);

  if (!influencerInfo) {
    return res.sendStatus(500);
  }

  return res.json(influencerInfo);
});

module.exports = router;
