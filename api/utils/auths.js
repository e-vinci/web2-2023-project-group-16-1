const jwt = require('jsonwebtoken');

const jwtSecret = 'NicoTitiEfe';

const authorize = (req, res, next) => {
  const token = req.get('authorization');

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const { id } = decoded;

    if (!id) return res.sendStatus(401);

    req.userId = id; // request.user object is available in all other middleware functions
    return next();
  } catch (err) {
    console.error('authorize: ', err);
    return res.sendStatus(401);
  }
};

module.exports = { authorize };
