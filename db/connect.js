const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

let _db;

const initDb = (callback) => {
	if (mongoose.connection.readyState === 1) {
		console.log("Db is already initialized!");
		return callback(null, mongoose.connection);
	}

	mongoose
		.connect(process.env.MONGODB_URI)
		.then(() => {
			console.log("Connected to MongoDB with Mongoose");
			_db = mongoose.connection;
			callback(null, _db);
		})
		.catch((err) => {
			console.error("MongoDB connection error:", err);
			callback(err);
		});
};

const getDb = () => {
	if (!_db) {
		throw Error("Db not initialized");
	}
	return _db;
};

module.exports = { initDb, getDb };
