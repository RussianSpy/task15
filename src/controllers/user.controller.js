const crypto = require('crypto');
const User = require('../models/user.model');

class UserController {

	static async login(ctx) {
		if (!ctx.form.isValid) {
			return ctx.status = 422;
		}

		try {
			const result = await User.findOne({ login: ctx.request.body.login });

			const hash = crypto.createHash('sha384');
			hash.update(ctx.request.body.password);

			// Checking password
			if(hash.digest('hex') !== result.password){
				ctx.response.status = 401;
				ctx.body = { error: "error", message: 'Wrong login or password' };
				return;
			}

			let response = {
				_id: result._id,
				login: result.login,
			};

			ctx.response.status = 200;
			ctx.body = response;

		} catch (error) {
			ctx.response.status = 401;
			// For security reasons we use the same message in this error case
			ctx.body = { error: "error", message: 'Wrong login or password' };
		}
	}

	static async register(ctx) {
		if (!ctx.form.isValid) {
			return ctx.status = 422;
		}

		try {
			const result = await User.findOne({ login: ctx.request.body.login });

			// Checking have this login already
			if(result) {
				ctx.response.status = 401;
				ctx.body = { error: "error", message: 'This login is already taken' };
				return;
			}

			const hash = crypto.createHash('sha384');
			hash.update(ctx.request.body.password);

			await User.create({
				login: ctx.request.body.login,
				password: hash.digest('hex')
			});

			ctx.response.status = 200;

		} catch (error) {
			ctx.response.status = 401;
			ctx.body = { error: "error", message: 'Something went wrong' };
		}
	}
}

module.exports = UserController;