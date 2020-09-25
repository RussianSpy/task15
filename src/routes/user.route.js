const Router = require('koa-router');
const router = new Router();

const UserController = require('../controllers/user.controller');

const datalize = require('datalize');
const field = datalize.field;

// User authorization
router.post('/login',
	datalize([
	    field('login').required(),
	    field('password').required()
	]),
	UserController.login);

// Registration new user
router.post('/registration',
	datalize([
		field('login').required(),
		field('password').required().length(5, 24)
	]),
	UserController.register);

module.exports = router;