/* eslint-disable no-underscore-dangle */

const { resolve } = require("path");
const Datastore = require("nedb-core");
require("tsubaki").promisifyAll(Datastore.prototype);

let dataStores;
const fs = require("fs-nextra");

let baseDir;

exports.init = (client) => {
  dataStores = new client.methods.Collection();
  baseDir = resolve(client.clientBaseDir, "bwd", "provider", "nedb");
  return fs.ensureDir(baseDir).catch(err => client.emit("log", err, "error"));
};

const resolveQuery = query => (query instanceof Object ? query : { id: query });

/* Table methods */

/**
 * Check if a table exists.
 * @param {string} table The name of the table you want to check.
 * @returns {boolean}
 */
exports.hasTable = table => dataStores.has(table);

/**
 * Create a new table.
 * @param {string} table The name for the new table.
 * @param {boolean} [persistent=true] Whether the DB should be persistent.
 * @returns {Promise<void>}
 */
exports.createTable = async (table, persistent = true) => {
  if (dataStores.has(table)) return null;
  const db = new Datastore(persistent ? { filename: resolve(baseDir, `${table}.db`), autoload: true } : {});
  dataStores.set(table, db);
  return db;
};

/**
 * Delete a table.
 * @param {string} table The name of the table to delete.
 * @returns {Promise<boolean>}
 */
exports.deleteTable = async (table) => {
  if (dataStores.has(table)) {
    await this.deleteAll(table);
    dataStores.delete(table);
    return true;
  }
  return false;
};

/* Document methods */

/**
 * Get all entries from a table.
 * @param {string} table The name of the table to get all entries from.
 * @returns {Promise<Object[]>}
 */
exports.getAll = async (table) => {
  const data = await dataStores.get(table).findAsync({});
  for (let i = 0; i < data.length; i++) { delete data[i]._id; }
  return data;
};

/**
 * Get a single entry from a table by a query.
 * @param {string} table The name of the table to get the entry from.
 * @param {string|Object} query The query object. If it is a string, it will search by 'id'.
 * @returns {Promise<Object>}
 */
exports.get = async (table, query) => {
  const data = await dataStores.get(table).findOneAsync(resolveQuery(query));
  delete data._id;
  return data;
};

/**
 * Check if a entry exists from a table by a query.
 * @param {string} table The name of the table to check the entry from.
 * @param {string|Object} query The query object. If it is a string, it will search by 'id'.
 * @returns {Promise<boolean>}
 */
exports.has = (table, query) => this.get(table, query).then(result => !!result);

/**
 * Insert a new entry into a table.
 * @param {string} table The name of the table to insert the entry.
 * @param {string|Object} query The query object. If it is a string, it will be keyed by 'id'.
 * @param {Object} data The data you want the entry to contain.
 * @returns {Promise<Object>}
 */
exports.create = (table, query, data) => dataStores.get(table).insertAsync(Object.assign(data, resolveQuery(query)));
exports.set = (...args) => this.create(...args);
exports.insert = (...args) => this.create(...args);

/**
 * Update an entry from a table.
 * @param {string} table The name of the table to update the entry from.
 * @param {string|Object} query The query object. If it is a string, it will search by 'id'.
 * @param {Object} data The data you want to update.
 * @returns {Promise<number>} Returns a Promise containing the number of Documents Updated. (Either 0 or 1).
 */
exports.update = async (table, query, data) => {
  const res = await this.get(table, query);
  await dataStores.get(table).updateAsync(resolveQuery(query), Object.assign(res, data));
  await dataStores.get(table).persistence.compactDatafile();
  return true;
};
exports.replace = async (table, query, data) => {
  await dataStores.get(table).updateAsync(resolveQuery(query), data);
  await dataStores.get(table).persistence.compactDatafile();
  return true;
};

/**
 * Delete a single or all entries from a table that matches the query.
 * @param {string} table The name of the table to delete the entry from.
 * @param {string|Object} query The query object. If it is a string, it will search by 'id'.
 * @param {boolean} [all=false] Option to delete all documents that match the query.
 * @returns {Promise<number>} Returns a Promise with the number of documents deleted.
 */
exports.delete = (table, query, all = false) => dataStores.get(table).removeAsync(resolveQuery(query), { multi: all });

/**
 * Delete all entries from a table.
 * @param {string} table The name of the table to delete the entries from.
 * @returns {Promise<number>} Returns a Promise with the number of documents deleted.
 */
exports.deleteAll = table => this.delete(table, {}, true);

/**
 * Count the amount of entries from a table based on the query.
 * @param {string} table The name of the table to count the entries from.
 * @param {string|Object} [query={}] The query object. If it is a string, it will search by 'id'.
 * @returns {Promise<number>} The amount of entries that matches the query.
 */
exports.count = (table, query = {}) => dataStores.get(table).countAsync(resolveQuery(query));

exports.conf = {
  moduleName: "nedb",
  enabled: true,
  requiredModules: ["tsubaki", "nedb-core"],
};

exports.help = {
  name: "nedb",
  type: "providers",
  description: "Allows you to use NeDB functionality throught Komada",
};
