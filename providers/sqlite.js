const { resolve } = require("path");
const db = require("sqlite");
const fs = require("fs-nextra");

/*
  This provider requires Node.js 8.1.0
*/

exports.init = async (client) => {
  const baseDir = resolve(client.clientBaseDir, "bwd", "provider", "sqlite");
  await fs.ensureDir(baseDir);
  await fs.ensureFile(resolve(baseDir, "db.sqlite"));
  return db.open(resolve(baseDir, "db.sqlite"));
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
exports.createTable = (table, rows) => db.run(`CREATE TABLE '${table}' (${rows.join(", ")});`);

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
 * @param {Object} options key and value.
 * @returns {Promise<Object[]>}
 */
exports.getAll = (table, options = {}) => {
  const query = options.key && options.value ?
    `SELECT * FROM '${table}' WHERE ${options.key} = ${this.sanitize(options.value)}` :
    `SELECT * FROM '${table}'`;
  return db.all(query);
};

/**
 * Get a row from a table.
 * @param {string} table The name of the table.
 * @param {string} key The row id or the key to find by. If value is undefined, it'll search by 'id'.
 * @param {string} [value=null] The desired value to find.
 * @returns {Promise<?Object>}
 */
exports.get = (table, key, value = null) => {
  const query = !value ?
    `SELECT * FROM ${table} WHERE id = ${this.sanitize(key)}` :
    `SELECT * FROM ${table} WHERE ${key} = ${this.sanitize(value)}`;
  return db.get(query).catch(() => null);
};

/**
 * Check if a row exists.
 * @param {string} table The name of the table
 * @param {string} value The value to search by 'id'.
 * @returns {Promise<boolean>}
 */
exports.has = (table, value) => db.get(`SELECT id FROM '${table}' WHERE id = ${this.sanitize(value)}`)
  .then(() => true)
  .catch(() => false);

/**
 * Get a random row from a table.
 * @param {string} table The name of the table.
 * @returns {Promise<Object>}
 */
exports.getRandom = table => db.get(`SELECT * FROM '${table}' ORDER BY RANDOM() LIMIT 1`);

/**
 * Insert a new document into a table.
 * @param {string} table The name of the table.
 * @param {string} row The row id.
 * @param {Object} data The object with all properties you want to insert into the document.
 * @returns {Promise<Object>}
 */
exports.create = (table, row, data) => {
  const { keys, values } = this.serialize(Object.assign(data, { id: row }));
  return db.run(`INSERT INTO '${table}' (${keys.join(", ")}) VALUES(${values.map(this.sanitize).join(", ")})`);
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
  const inserts = Object.entries(data).map(value => `${value[0]} = ${this.sanitize(value[1])}`).join(", ");
  return db.run(`UPDATE '${table}' SET ${inserts} WHERE id = '${row}'`);
};
exports.replace = (...args) => this.update(...args);

/**
 * Delete a document from the table.
 * @param {string} table The name of the table.
 * @param {string} row The row id.
 * @returns {Promise<Object>}
 */
exports.delete = (table, row) => db.run(`DELETE FROM '${table}' WHERE id = ${this.sanitize(row)}`);

/**
 * Update the columns from a table.
 * @param {string} table The name of the table.
 * @param {string[]} columns Array of columns.
 * @param {array[]} schema Tuples of keys/values from the schema.
 * @returns {boolean}
 */
exports.updateColumns = async (table, columns, schema) => {
  await db.run(`CREATE TABLE \`temp_table\` (\n${schema.map(s => `\`${s[0]}\` ${s[1]}`).join(",\n")}\n);`);
  await db.run(`INSERT INTO \`temp_table\` (\`${columns.join("`, `")}\`) SELECT \`${columns.join("`, `")}\` FROM \`${table}\`;`);
  await db.run(`DROP TABLE \`${table}\`;`);
  await db.run(`ALTER TABLE \`temp_table\` RENAME TO \`${table}\`;`);
  return true;
};

/**
 * Get a row from an arbitrary SQL query.
 * @param {string} sql The query to execute.
 * @returns {Promise<Object>}
 */
exports.runGet = sql => db.get(sql);

/**
 * Get all rows from an arbitrary SQL query.
 * @param {string} sql The query to execute.
 * @returns {Promise<Object>}
 */
exports.runAll = sql => db.all(sql);

/**
 * Run arbitrary SQL query.
 * @param {string} sql The query to execute.
 * @returns {Promise<Object>}
 */
exports.run = sql => db.run(sql);

/**
 * Execute arbitrary SQL query.
 * @param {string} sql The query to execute.
 * @returns {Promise<Object>}
 */
exports.exec = sql => db.exec(sql);

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

exports.sanitize = (string) => {
  if (typeof string === "string") return `'${string.replace(/'/g, "''")}'`;
  else if (string instanceof Object) return `'${JSON.stringify(string).replace(/'/g, "''")}'`;
  return JSON.stringify(string);
};

exports.CONSTANTS = {
  String: "TEXT",
  Integer: "INTEGER",
  Float: "INTEGER",
  AutoID: "INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE",
  Timestamp: "DATETIME",
  AutoTS: "DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL",
};

exports.conf = {
  moduleName: "sqlite",
  enabled: true,
  requiredModules: ["sqlite", "fs-nextra"],
  sql: true,
};

exports.help = {
  name: "sqlite",
  type: "providers",
  description: "Allows you use SQLite functionality throughout Komada.",
};
