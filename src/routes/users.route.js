const { Router } = require('express');
const userController = require('../controllers/users.controller');

const db = require('../database/models');

const User = db.User;

const usersRouter = Router();

usersRouter.get('/all', userController.allUser);

usersRouter.get('/signup', (req, res) => {
    res.render('signup')
})

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         first_name:
 *           type: string
 *           description: The first name of the user
 *         last_name:
 *           type: string
 *           description: The last name of the user
 *         email:
 *           type: string
 *           description: The email address to be associated with the account
 *         password:
 *           type: string
 *           description: The user password to secure account
 *         createdAt:
 *           type: string
 *           format: date
 *           description: Autogenerated timestamp
 *       example:
 *         id: d5fE_asz
 *         fist_name: John
 *         last_name: Doe
 *         email: 
 *         password: password
 *         createdAt: 2020-03-10T04:05:06.157Z
 */
usersRouter.post('/signup', userController.newUser);


module.exports = usersRouter;
