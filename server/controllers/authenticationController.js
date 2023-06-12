const db = require('../models/pg.js');
authenticationController = {};

authenticationController.checkAuth = async (req, res, next) => {
  const { sessionCookie } = req.cookies;

  try {
    const getSessionQuery = 'SELECT account_id FROM session WHERE cookie = $1';
    const getSessionValues = [sessionCookie];
    const getSessionReturn = db.query(getSessionQuery, getSessionValues);
    if (getSessionQuery.rows.length === 0) {
      return next({
        log: 'Invalid session cookie attempted login',
        status: 401,
        message: { err: 'An error has occurred' },
        redirect: '/login',
      });
    } else {
      res.locals.accountId = getSessionReturn.rows[0].account_id;
      return next();
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = authenticationController;
