/* eslint-disable max-len */
const express = require('express');
const { register, login } = require('../models/auths');

const router = express.Router();

/* Register a user */
router.post('/register', async (req, res) => {
  const email = req?.body?.email?.length !== 0 ? req.body.email : undefined;
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
  const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;

  if (!username || !email || !password) {
    return res.status(400).json('champs invalide'); // 400 Bad Request
  }
  const authenticatedUser = await register(email, username, password);

  if (!authenticatedUser) {
    return res.status(409).json('Erreur serveur'); // 409 Conflict
  }
  return res.json('OK');
});

/* Login a user */
router.post('/login', async (req, res) => {
  const email = req?.body?.email?.length !== 0 ? req.body.email : undefined;
  const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;

  if (!email || !password) return res.sendStatus(400); // 400 Bad Reques

  const authenticatedUser = await login(email, password);

  if (!authenticatedUser) return res.sendStatus(401); // 401 Unauthorized

  return res.json(authenticatedUser);
});

module.exports = router;
