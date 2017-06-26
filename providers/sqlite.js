const { sep, resolve } = require("path");
const db = require("sqlite");
const fs = require("fs-nextra");

exports.init = async (client) => {
  const baseDir = resolve(client.clientBaseDir, "bwd", "provider", "sqlite");
  await fs.ensureDir(baseDir);
  await fs.ensureFile(`${baseDir + sep}db.sqlite`);
  return db.open(`${baseDir + sep}db.sqlite`);
};

/* Table methods */

/**
 * Checks if a table exists.
 * @param {string} table The name of the table you want to check.
 * @returns {Promise<boolean>}
 */
exports.hasTable = table => db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='${table}'`)
  .then(row => !!row);

/**
 * Creates a new table.
 * @param {string} table The name for the new table.
 * @param {string} rows The rows for the table.
 * @returns {Promise<Object>}
 */
exports.createTable = (table, rows) => db.run(`CREATE TABLE '${table}' (${rows});`);

/**
 * Drops a table.
 * @param {string} table The name of the table to drop.
 * @returns {Promise<Object>}
 */
exports.deleteTable = table => db.run(`DROP TABLE '${table}'`);

/* Document methods */

/**
 * Get all documents from a table.
 * @param {string} table The name of the table to fetch from.
 * @returns {Promise<Object[]>}
 */
exports.getAll = (table, { key = null, value = null }) => {
  if (key) return db.all(`SELECT * FROM ${table} WHERE ${key} = '${value}'`);
  return db.all(`SELECT * FROM ${table}`);
};

/**
 * Get a row from a table.
 * @param {string} table The name of the table.
 * @param {string} key The row id or the key to find by. If value is undefined, it'll search by 'id'.
 * @param {string} [value=null] The desired value to find.
 * @returns {Promise<?Object>}
 */
exports.get = (table, key, value = null) => {
  if (key && !value) return db.get(`SELECT * FROM ${table} WHERE id = '${key}'`).catch(() => null);
  return db.get(`SELECT * FROM ${table} WHERE ${key} = '${value}'`).catch(() => null);
};

/**
 * Check if a row exists.
 * @param {string} table The name of the table
 * @param {string} value The value to search by 'id'.
 * @returns {Promise<boolean>}
 */
exports.has = (table, value) => db.get(`SELECT id FROM ${table} WHERE id = '${value}'`)
  .then(() => true)
  .catch(() => false);

/**
 * Get a random row from a table.
 * @param {string} table The name of the table.
 * @returns {Promise<Object>}
 */
exports.getRandom = table => db.get(`SELECT * FROM ${table} ORDER BY RANDOM() LIMIT 1`);

/**
 * Insert a new document into a table.
 * @param {string} table The name of the table.
 * @param {string} row The row id.
 * @param {Object} data The object with all properties you want to insert into the document.
 * @returns {Promise<Object>}
 */
exports.create = (table, row, data) => {
  const { keys, values } = this.serialize(Object.assign(data, { id: row }));
  return db.run(`INSERT INTO ${table} (${keys.join(", ")}) VALUES(${values.join(", ")})`);
};
exports.set = (...args) => this.create(...args);
exports.insert = (...args) => this.create(...args);

/**
 * Update a row from a table.
 * @param {string} table The name of the table.
 * @param {string} row The row id.
 * @param {Object} data The object with all the properties you want to update.
 * @returns {Promise<Object>}
 */
exports.update = (table, row, data) => {
  const inserts = Object.entries(data).map(value => `'${value[0]}' = '${value[1]}'`).join(", ");
  return db.run(`UPDATE '${table}' SET ${inserts} WHERE id = '${row}'`);
};
exports.replace = (...args) => this.update(...args);

/**
 * Delete a document from the table.
 * @param {string} table The name of the directory.
 * @param {string} row The row id.
 * @returns {Promise<Object>}
 */
exports.delete = (table, row) => db.run(`DELETE FROM ${table} WHERE id = '${row}'`);

/**
 * Get a row from an arbitrary SQL query.
 * @param {string} sql The query to execute.
 * @returns {Promise<Object>}
 */
exports.run = sql => db.get(sql); // Returns a result row Best to be used with limit

/**
 * Get all rows from an arbitrary SQL query.
 * @param {string} sql The query to execute.
 * @returns {Promise<Object>}
 */
exports.runAll = sql => db.all(sql); // Returns **ALL** result rows

/**
 * Run arbitrary SQL query.
 * @param {string} sql The query to execute.
 * @returns {Promise<Object>}
 */
exports.exec = sql => db.run(sql);

/**
 * Transform NoSQL queries into SQL.
 * @param {Object} data The object.
 * @returns {Object}
 */
exports.serialize = (data) => {
  const keys = [];
  const values = [];
  const entries = Object.entries(data);
  for (let i = 0; i < entries.length; i++) {
    keys[i] = entries[i][0];
    values[i] = entries[i][1];
  }

  return { keys, values };
};

exports.conf = {
  moduleName: "sqlite",
  enabled: true,
  requiredModules: ["sqlite", "fs-nextra"],
};

exports.help = {
  name: "sqlite",
  type: "providers",
  description: "Allows you use SQLite functionality throughout Komada.",
};
