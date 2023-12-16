/* eslint-disable max-len */
const express = require('express');
const {
  subscribe, unSubscribe, getSubscriptions, deleteUser,
} = require('../models/users');
const { authorize } = require('../utils/auths');

const router = express.Router();

router.post('/subscribe', authorize, async (req, res) => {
  const userId = req?.userId?.length !== 0 ? req.userId : undefined;
  const influencer = req?.body?.influencer?.length !== 0 ? req.body.influencer : undefined;
  const platform = req?.body?.platform?.length !== 0 ? req.body.platform : undefined;

  if (!influencer || !platform) return res.sendStatus(400); // 400 Bad Request

  const subscription = await subscribe(userId, influencer, platform);

  if (!subscription) return res.sendStatus(500);

  return res.sendStatus(200);
});

router.post('/unsubscribe', authorize, async (req, res) => {
  const userId = req?.userId?.length !== 0 ? req.userId : undefined;
  const influencer = req?.body?.influencer?.length !== 0 ? req.body.influencer : undefined;
  const platform = req?.body?.platform?.length !== 0 ? req.body.platform : undefined;

  if (!userId || !influencer || !platform) return res.sendStatus(400); // 400 Bad Request

  const unsubscription = await unSubscribe(userId, influencer, platform);

  if (!unsubscription) return res.sendStatus(500);

  return res.json(unsubscription);
});

router.get('/', authorize, async (req, res) => {
  const userId = req?.userId?.length !== 0 ? req.userId : undefined;

  const subscriptions = await getSubscriptions(userId);

  if (!subscriptions) {
    return res.sendStatus(500);
  }

  return res.json(subscriptions);
});

router.post('/deleteUser', authorize, async (req, res) => {
  const userId = req?.userId?.length !== 0 ? req.userId : undefined;

  if (!userId) return res.sendStatus(400); // 400 Bad Request

  const isdelete = await deleteUser(userId);

  if (!isdelete) return res.sendStatus(500);

  return res.json(isdelete);
});

module.exports = router;
