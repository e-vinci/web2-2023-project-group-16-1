const express = require('express');
const { getPlatform } = require('../models/dbUtils');

const router = express.Router();

router.get('/', async (req, res) => {
  const listplatform = await getPlatform();

  if (!listplatform) return res.sendStatus(500);

  return res.json(listplatform);
});

module.exports = router;
