/* eslint-disable max-len */
const express = require('express');
const { subscribe, unSubscribe, getSubscriptions } = require('../models/users');

const router = express.Router();

router.post('/subscribe', async (req, res) => {
  const influencer = req?.body?.influencer?.length !== 0 ? req.body.influencer : undefined;
  const platform = req?.body?.platform?.length !== 0 ? req.body.platform : undefined;

  if (!influencer || !platform) return res.sendStatus(400); // 400 Bad Request

  const subscription = await subscribe(influencer, platform);

  if (!subscription) return res.sendStatus(500);

  return res.sendStatus(200);
});

router.post('/unsubscribe', async (req, res) => {
  const url = req?.body?.url?.length !== 0 ? req.body.url : undefined;

  if (!url) return res.sendStatus(400); // 400 Bad Request

  const unsubscription = await unSubscribe(url);

  if (!unsubscription) return res.sendStatus(500);

  return res.json(unsubscription);
});

router.get('/', async (req, res) => {
  const subscriptions = getSubscriptions(req?.params?.id);

  if (!subscriptions) {
    return res.sendStatus(500);
  }

  return res.json(subscriptions);
});

module.exports = router;
