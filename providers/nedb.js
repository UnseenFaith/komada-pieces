/* eslint-disable no-unused-expressions */
let db;
const { resolve } = require("path");
const { promisifyAll } = require("tsubaki");
const Datastore = require("nedb-core");

promisifyAll(Datastore.prototype);

const config = {
  persistent: false,
};

/**
 * Initiates the NeDB Provider
 * @param {?Client} client Komada Client
 */
exports.init = (client) => {
  db = new Datastore(config.persistent ? { filename: resolve(`${client.clientBaseDir}/bwd/db/komada-nedb.db`), autoload: true } : {});
};

/**
 * Inserts a document or an array of documents into the Datastore.
 * @param {(Object|Object[])} doc Object or Array of Objects to insert into Datastore
 * @returns {Promise<Object|Object[]>}
 */
exports.insert = doc => db.insertAsync(doc);

/**
 * Updates a document matching the query
 *
 * @param {any} query Query Object for Property Equality or using Query Operators
 * @param {any} updateDoc Object containing a new Document or Update Operators
 * @returns {Promise<number>} Returns the number of Documents updated.
 */
exports.update = (query, updateDoc) => db.updateAsync(query, updateDoc);

/**
 * Deletes documents matching the query
 *
 * @param {any} query Query Object for Property Equality or using Query Operators
 * @param {boolean} [all=false] Delete All
 * @returns {Promise<number>} Returns the numbers of Documents deleted
 */
exports.delete = (query, all = false) => db.removeAsync(query, { multi: all });

/**
 * Deletes all Documents in the Datastore
 *
 * @returns {Promise<number>} Returns the numbers of Documents deleted
 */
exports.deleteAll = () => this.delete({}, true);

/**
 * Get all documents in the Datastore
 *
 * @returns {Promise<Object[]>}
 */
exports.all = () => db.findAsync({});

/**
 * Gets a document matching the query
 *
 * @param {any} query Query Object for Property Equality or using Query Operators
 * @returns {Promise<Object>}
 */
exports.get = query => db.findOneAsync(query);

/**
 * Counts the number of Documents matching the query
 *
 * @param {any} [query={}] Query Object for Property Equality or using Query Operators
 * @returns {Promise<number>}
 */
exports.count = (query = {}) => db.countAsync(query);

exports.eval = () => db;
