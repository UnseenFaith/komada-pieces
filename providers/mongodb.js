const Mongo = require("mongodb").MongoClient;

let db;

const config = {
  moduleName: "mongo",
  enabled: true,
  dbName: "Komada",
  dbURL: "mongodb://localhost:27017/",
};

exports.init = async () => {
  db = await Mongo.connect(`${config.dbURL}${config.dbName}`);
};

// Collection Methods. Collections are implicitly created with document methods regardess.

/**
 * Create a collection within a DB. Options may be specfied, refer to MongoDB docs.
 * @param {string} name Name of the Collection to crate
 * @param {Object} [options] Object containing various options for the created Collection
 * @returns {Promise<Collection>} Returns a promise containing the created Collection.
 */
exports.createCollection = (name, options) => db.createCollection(name, options);

/**
 * Drops a collection within a DB.
 * @param {string} name Name of the collection to drop.
 * @returns {Promise<boolean>}
 */
exports.dropCollection = name => db.dropCollection(name);

// Document Methods. Update requires MongoDB Update Operators. Be sure to refer to MongoDB documentation.
/**
 * Retrieves all Documents in a collection.
 * @param {string} collection Name of the Collection
 * @returns {Promise<Array>}
 */
exports.all = collection => db.collection(collection).find({}).toArray();

/**
 * Retrieves a single Document from a Collection that matches a user determined ID
 * @param {string} collection Name of the Collection
 * @param {string} id ID of the document
 * @returns {Promise<?Object>}
 */
exports.get = (collection, id) => db.collection(collection).findOne({ id }); // eslint-disable-line quote-props

/**
 * Inserts a Document into a Collection using a user provided object.
 * @param {string} collection Name of the Collection
 * @param {Object} docObj Document Object to insert
 * @returns {Promise<CommandResult>}
 */
exports.add = (collection, docObj) => db.collection(collection).insertOne(docObj);

/**
 * Deletes a Document from a Collection that matches a user determined ID *
 * @param {string} collection Name of the Collection
 * @param {string} id ID of the document
 * @returns {Promise<CommandResult>}
 */
exports.delete = (collection, id) => db.collection(collection).deleteOne({ id });

/**
 * Updates a Document using MongoDB Update Operators. *
 * @param {string} collection Name of the Collection
 * @param {Object} filter The Filter used to select the document to update
 * @param {Object} updateObj The update operations to be applied to the document
 * @returns {Promise<CommandResult>}
 */
exports.update = (collection, filter, updateObj) => db.collection(collection).updateOne(filter, updateObj);

/**
 * Replaces a Document with a new Document specified by the user *
 * @param {string} collection Name of the Collection
 * @param {Object} filter The Filter used to select the document to update
 * @param {Object} repDoc The Document that replaces the matching document
 * @returns {Promise<CommandResult>}
 */
exports.replace = (collection, filter, repDoc) => db.collection(collection).replaceOne(filter, repDoc);

exports.eval = () => db;

exports.help = {
  name: "mongodb",
  type: "providers",
  description: "Allows use of MongoDB functionality throughout Komada.",
};

exports.conf = config;
exports.conf.requiredModules = ["mongodb"];
