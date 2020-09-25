require('dotenv').config({ path: __dirname + '/../.env' });
const Koa = require('koa');
const cors = require('@koa/cors');
const koaBody = require('koa-body');

// Routes
const taskRoute = require('./routes/task.route.js');
const userRoute = require('./routes/user.route.js');

const app = new Koa();

// Connect to mongodb
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error: '));

// Koa middleware
app.keys = ['test secret key'];
app.use(cors({credentials: true}));
app.use(koaBody());

// Adding routes
app.use(taskRoute.routes());
app.use(userRoute.routes());

// Creating server
const server = app.listen(process.env.APP_PORT, () => {
	console.log(`Server listening on port: ${process.env.APP_PORT}`);
});