/* eslint-disable max-len */
const express = require('express');
const { subscribe } = require('../models/users');

const router = express.Router();

router.post('/subscribe', async (req, res) => {
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
  const url = req?.body?.url?.length !== 0 ? req.body.url : undefined;

  if (!username || !url) return res.sendStatus(400); // 400 Bad Request

  const subscription = await subscribe(username, url);

  if (!subscription) return res.sendStatus(500);

  return res.json(subscription);
});

module.exports = router;
