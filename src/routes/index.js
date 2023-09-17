const { Router } = require('express');
const authRouter = require('./auth.route');
const snipperRouter = require('./snipper.route');
const usersRouter = require('./users.route');
const ensureLoggedIn = require('../middleware/ensureLogin');

const router = Router()

router.use('/auth', authRouter);
router.use('/snipper', ensureLoggedIn, snipperRouter);
router.use('/users', usersRouter);

module.exports = router;