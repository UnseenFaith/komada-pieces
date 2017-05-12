let db;
const config = {
  moduleName: "mongo",
  enabled: true,
  dbName: "Komada",
  dbURL: "mongodb://localhost:27017/",
};

function connect() { db.connect(`${config.dbURL}${config.dbName}`); }

// Collection Methods. Collections are implicitly created with document methods regardess.

/**
 * Create a collection within a DB. Options may be specfied, refer to MongoDB docs.
 *
 * @param {string} name Name of the Collection to crate
 * @param {Object} [options] Object containing various options for the created Collection
 * @returns {Promise} Returns a promise containing the created Collection.
 */
exports.createCollection = (name, options) => connect().then(db => db.createCollection(name, options));

/**
 * Drops a collection within a DB.
 *
 * @param {string} name
 * @returns {Promise}
 */
exports.dropCollection = name => connect().then(db => db.dropCollection(name));

// Document Methods. Update requires MongoDB Update Operators. Be sure to refer to MongoDB documentation.
/**
 *
 *
 * @param {string} collection
 */
exports.all = collection => connect().then(db => db.collection(collection).find({}).toArray());

/**
 *
 *
 * @param {string} collection
 * @param {string} id
 */
exports.get = (collection, id) => connect().then(db => db.collection(collection).findOne({ "id": id })); // eslint-disable-line quote-props

/**
 *
 *
 * @param {string} collection
 * @param {Object} docObj
 */
exports.add = (collection, docObj) => connect().then(db => db.collection(collection).insertOne(docObj));

/**
 *
 *
 * @param {string} collection
 * @param {string} id
 */
exports.delete = (collection, id) => connect().then(db => db.collection(collection).deleteOne({ id }));

/**
 *
 *
 * @param {string} collection
 * @param {Object} filter
 * @param {Object} updateObj
 */
exports.update = (collection, filter, updateObj) => connect().then(db => db.collection(collection).updateOne(filter, updateObj));

/**
 *
 *
 * @param {string} collection
 * @param {Object} filter
 * @param {Object} repDoc
 */
exports.replace = (collection, filter, repDoc) => connect().then(db => db.collection(collection).replaceOne(filter, repDoc));

exports.eval = () => connect();

exports.help = {};
exports.help.name = "mongodb";
exports.help.type = "providers";
exports.help.description = "Allows you use MongoDB functionality throughout Komada.";
exports.conf = config;
exports.conf.requiredModules = ["mongodb"];

exports.init = () => {
  db = require("mongodb").MongoClient;
};
