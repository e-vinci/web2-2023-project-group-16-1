/* eslint-disable max-len */
const express = require('express');
const { getInfluencers } = require('../models/dbUtils');

const router = express.Router();

router.get('/', async (req, res) => {
  console.log('je suis dans la route');

  const listInfluencers = await getInfluencers();

  if (!listInfluencers) return res.sendStatus(500);

  return res.json(listInfluencers);
});

module.exports = router;
