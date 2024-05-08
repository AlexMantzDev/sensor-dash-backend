// * IMPORTS
const mongoose = require("mongoose");

// * METHODS
async function connectToMongo(uri) {
	try {
		console.log(`connecting to db @ ${uri}...`);
		const connection = await mongoose.connect(uri);
		if (connection) {
			console.log(`connection successful.`);
			return connection;
		}
	} catch (err) {
		console.log(err);
	}
}

// * EXPORTS
module.exports = connectToMongo;
