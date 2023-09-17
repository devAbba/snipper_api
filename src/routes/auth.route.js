const { Router } = require('express');
const passport = require('passport');
const usersController = require('../controllers/users.controller')

const authRouter = Router();

/**
 * @swagger
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
authRouter.get('/login', (req, res) => {
  res.render('login')
});

/**
* @swagger
 * paths:
 *  /auth/login:
 *    post:
 */
authRouter.post('/login', passport.authenticate('local', { failureRedirect: '/auth/login' }),
  function(req, res) {
    res.status(200).json({
      status: true,
      message: "successfully loggend in"
    })
});

/**
* @swagger
 * paths:
 *  /auth/logout:
 *    post:
 */
authRouter.post('/logout', usersController.logout);

module.exports = authRouter;