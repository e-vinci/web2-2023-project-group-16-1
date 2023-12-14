/* eslint-disable max-len */
const express = require('express');
const { register, login } = require('../models/auths');

const router = express.Router();

/* Register a user */
router.post('/register', async (req, res) => {
  const email = req?.body?.email?.length !== 0 ? req.body.email : undefined;
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
  const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;
  const passwordConfirm = req?.body?.passwordConfirm?.length !== 0 ? req.body.passwordConfirm : undefined;

  if (!username || !email || !password || !passwordConfirm) {
    return res.sendStatus(400); // 400 Bad Request
  }

  if (password.length < 8) {
    return res.json('Mdp trop cours').status(400);
  }

  const authenticatedUser = await register(email, username, password, passwordConfirm);

  if (!authenticatedUser) {
    return res.sendStatus(409); // 409 Conflict
  }

  return res.json(authenticatedUser);
});

/* Login a user */
router.post('/login', async (req, res) => {
  console.log(req.body);

  const email = req?.body?.email?.length !== 0 ? req.body.email : undefined;
  const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;

  if (!email || !password) return res.sendStatus(400); // 400 Bad Reques

  const authenticatedUser = await login(email, password);

  if (!authenticatedUser) return res.sendStatus(401); // 401 Unauthorized

  return res.json(authenticatedUser);
});

module.exports = router;
