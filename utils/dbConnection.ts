const mongoose = require('mongoose')
//Connection to MongoDB
const dev_db_url: string = 'mongodb://localhost:27017/portfolio'
mongoose.connect(process.env.MONGODB_URI || dev_db_url, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise
const db = mongoose.connection;

export { }