const mongodb = require('mongodb');
const debug = require('debug')('api');
require('dotenv').config();

function initialize(dbName, dbCollectionName, successCallback, failureCallback) {
	
	const MongoClient = mongodb.MongoClient;
	const dbConnectionUrl = process.env.DB_URI;
	
	MongoClient.connect(dbConnectionUrl, { useUnifiedTopology: true }, function (err, dbInstance) {
		if (err) {
			debug(`[MongoDB connection] ERROR: ${err}`);
			failureCallback(err);
		} else {
			const dbObject = dbInstance.db(dbName);
			const dbCollection = dbObject.collection(dbCollectionName);

			debug("[MongoDB connection] SUCCESS");
			successCallback(dbCollection);
		}
	});
}

module.exports = { initialize };