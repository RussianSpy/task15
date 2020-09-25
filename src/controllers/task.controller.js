const Task = require('../models/task.model');

class TaskController {

	// Add new task
	static async add(ctx) {
		if (!ctx.request.body.title || !ctx.request.body.description) {
			return ctx.status = 422;
		}

		try {
			await Task.create({
				title: ctx.request.body.title,
				description: ctx.request.body.description,
			});

			ctx.response.status = 200;

		} catch (error) {
			ctx.response.status = 401;
			ctx.body = { error: "error", message: 'Something went wrong' };
		}
	}

	// List all tasks
	static async list(ctx) {
		try {
			const result = await Task.find({});

			ctx.response.status = 200;
			ctx.body = result;

		} catch (error) {
			ctx.response.status = 401;
			ctx.body = { error: "error", message: 'Something went wrong' };
		}
	}

	// Get task
	static async get(ctx) {
		try {
			let id = ctx.data.id || 0;

			const result = await Task.findOne({ _id: id });

			ctx.response.status = 200;
			ctx.body = result;

		} catch (error) {
			ctx.response.status = 401;
			ctx.body = { error: "error", message: 'Task not found' };
		}
	}

	// Update task
	static async update(ctx) {
		if (!ctx.request.body.title && !ctx.request.body.description) {
			return ctx.status = 422;
		}
		try {
			let id = ctx.data.id || 0;

			let data = {};

			if(ctx.request.body.title) data.title = ctx.request.body.title;
			if(ctx.request.body.description) data.description = ctx.request.body.description;

			await Task.updateOne({ _id: id }, data);

			ctx.response.status = 200;

		} catch (error) {
			ctx.response.status = 401;
			ctx.body = { error: "error", message: 'Something went wrong' };
		}
	}

	// Delete task
	static async delete(ctx) {
		try {
			let id = ctx.data.id || 0;

			await Task.deleteOne({ _id: id });

			ctx.response.status = 200;

		} catch (error) {
			ctx.response.status = 401;
			ctx.body = { error: "error", message: 'Something went wrong' };
		}
	}
}

module.exports = TaskController;