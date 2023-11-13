/* eslint-disable max-len */
const express = require('express');
const { subscribe, unSubscribe } = require('../models/users');

const router = express.Router();

router.post('/subscribe', async (req, res) => {
  const url = req?.body?.url?.length !== 0 ? req.body.url : undefined;

  if (!url) return res.sendStatus(400); // 400 Bad Request

  const subscription = await subscribe(url);

  if (!subscription) return res.sendStatus(500);

  return res.json(subscription);
});

router.post('/unsubscribe', async (req, res) => {
  const url = req?.body?.url?.length !== 0 ? req.body.url : undefined;

  if (!url) return res.sendStatus(400); // 400 Bad Request

  const unsubscription = await unSubscribe(url);

  if (!unsubscription) return res.sendStatus(500);

  return res.json(unsubscription);
});

module.exports = router;
