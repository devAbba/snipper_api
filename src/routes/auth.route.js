const { Router } = require('express');
const passport = require('passport');
const userController = require('../controllers/user.controller')

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
authRouter.post('/login', 
  passport.authenticate('local', { failureRedirect: '/auth/login' }),
  userController.login
);

/**
* @swagger
 * paths:
 *  /auth/logout:
 *    post:
 */
authRouter.post('/logout', userController.logout);

module.exports = authRouter;