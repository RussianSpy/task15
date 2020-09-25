const Router = require('koa-router');
const router = new Router();

const TaskController = require('../controllers/task.controller');

const datalize = require('datalize');
const field = datalize.field;


// Add new task
router.post('/task', TaskController.add);

// Tasks list
router.get('/task',	TaskController.list);

// Get task
router.get('/task/:id',
	datalize.params([
		field('id').patch().default(0).int()
	]),
	TaskController.get);

// Update task
router.patch('/task/:id',
	datalize.params([
		field('id').patch().default(0).int()
	]),
	TaskController.update);

// Delete task
router.delete('/task/:id',
	datalize.params([
		field('id').patch().default(0).int()
	]),
	TaskController.delete);

module.exports = router;