const { LocalStorage } = require("node-localstorage");
const { resolve } = require("path");
const fs = require("fs-nextra");

let baseDir;
const tables = {};

exports.init = async (client) => {
  baseDir = resolve(client.clientBaseDir, "bwd", "provider", "localStorage");
  await fs.ensureDir(baseDir);
  const files = await fs.readdir(baseDir);
  for (let i = 0; i < files.length; i++) {
    const table = files[i].split(".")[0];
    tables[table] = new LocalStorage(resolve(baseDir, table));
  }
};

/* Table methods */

/**
 * Checks if a LocalStorage table exists.
 * @param {string} table The name of the table you want to check.
 * @returns {boolean}
 */
exports.hasTable = table => !!tables[table];

/**
 * Creates a new LocalStorage table.
 * @param {string} table The name for the new LocalStorage table.
 * @returns {Void}
 */
exports.createTable = (table) => {
  tables[table] = new LocalStorage(resolve(baseDir, table));
  return true;
};

/**
 * Deletes a LocalStorage table.
 * @param {string} table The name of the LocalStorage table to delete.
 * @returns {boolean}
 */
exports.deleteTable = (table) => {
  const index = tables.indexOf(table);
  if (index > -1) {
    tables[table].clear();
    tables.splice(index, 1);
    return true;
  }
  throw "Table name not found in list of available tables.";
};

/* Document methods */

/**
 * Get a document from a LocalStorage.
 * @param {string} table The name of the LocalStorage table.
 * @param {string} id The document ID.
 * @returns {?Object}
 */
exports.get = (table, id) => tables[table].getItem(id);

/**
 * Check if a row exists.
 * @param {string} table The name of the LocalStorage table.
 * @param {string} id The document ID.
 * @returns {boolean}
 */
exports.has = (table, id) => !!tables[table].getItem(id);

/**
 * Insert a new document into a table.
 * @param {string} table The name of the LocalStorage table.
 * @param {string} id The document ID.
 * @param {Object} value The object with all properties you want to insert into the document.
 * @returns {Object}
 */
exports.create = (table, id, value) => tables[table].setItem(id, value);
exports.set = (...args) => this.create(...args);
exports.insert = (...args) => this.create(...args);

/**
 * Delete a document from the table.
 * @param {string} table The name of the LocalStorage table.
 * @param {string} id The document ID.
 * @returns {Void}
 */
exports.delete = (table, id) => tables[table].removeItem(id);

exports.conf = {
  moduleName: "localStorage",
  enabled: true,
  requiredModules: ["fs-nextra", "node-localstorage"],
};

exports.help = {
  name: "localstorage",
  type: "providers",
  description: "Allows you to create a \"local storage\" equivalent from a browser for use in Node.js",
};
