const mysql = require("mysql2/promise");

let db;

const throwError = (err) => { throw err; };

exports.init = async () => {
  db = await mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "Komada",
  });
};

/* Table methods */

/**
 * Checks if a table exists.
 * @param {string} table The name of the table you want to check.
 * @returns {Promise<boolean>}
 */
exports.hasTable = table => this.exec(`SELECT 1 FROM ${table} LIMIT 1`)
  .then(() => true)
  .catch(() => false);

/**
 * Creates a new table.
 * @param {string} table The name for the new table.
 * @param {string} rows The rows for the table.
 * @returns {Promise<Object>}
 */
exports.createTable = (table, rows) => this.exec(`CREATE TABLE '${table}' (${rows.join(", ")})`);

/**
 * Drops a table.
 * @param {string} table The name of the table to drop.
 * @returns {Promise<Object>}
 */
exports.deleteTable = table => this.exec(`DROP TABLE '${table}'`);

/* Document methods */

/**
 * Get all documents from a table.
 * @param {string} table The name of the table to fetch from.
 * @returns {Promise<Object[]>}
 */
exports.getAll = async (table, options = {}) => this.runAll(options.key && options.value ?
  `SELECT * FROM \`${table}\` WHERE \`${options.key}\` = ${this.sanitize(options.value)}` :
  `SELECT * FROM \`${table}\``).then(([rows]) => rows);

/**
 * Get a row from a table.
 * @param {string} table The name of the table.
 * @param {string} key The row id or the key to find by. If value is undefined, it'll search by 'id'.
 * @param {string} [value=null] The desired value to find.
 * @returns {Promise<?Object>}
 */
exports.get = (table, key, value = null) => this.run(!value ?
  `SELECT * FROM \`${table}\` WHERE \`id\` = ${this.sanitize(key)} LIMIT 1` :
  `SELECT * FROM \`${table}\` WHERE \`${key}\` = ${this.sanitize(value)} LIMIT 1`)
  .then(([rows]) => rows[0]).catch(() => null);

/**
 * Check if a row exists.
 * @param {string} table The name of the table
 * @param {string} value The value to search by 'id'.
 * @returns {Promise<boolean>}
 */
exports.has = (table, value) => this.runAll(`SELECT \`id\` FROM \`${table}\` WHERE \`id\` = ${this.sanitize(value)} LIMIT 1`)
  .then(([rows]) => rows.length > 0);

/**
 * Get a random row from a table.
 * @param {string} table The name of the table.
 * @returns {Promise<Object>}
 */
exports.getRandom = table => this.run(`SELECT * FROM \`${table}\` ORDER BY RAND() LIMIT 1`);

/**
 * Insert a new document into a table.
 * @param {string} table The name of the table.
 * @param {string} row The row id.
 * @param {Object} data The object with all properties you want to insert into the document.
 * @returns {Promise<Object>}
 */
exports.create = (table, row, data) => {
  const { keys, values } = this.serialize(Object.assign(data, { id: row }));
  return this.exec(`INSERT INTO \`${table}\` (\`${keys.join("`, `")}\`) VALUES (${values.map(this.sanitize).join(", ")})`);
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
  const inserts = Object.entries(data).map(value => `\`${value[0]}\` = ${this.sanitize(value[1])}`).join(", ");
  return this.exec(`UPDATE \`${table}\` SET ${inserts} WHERE id = '${row}'`);
};
exports.replace = (...args) => this.update(...args);

/**
 * Delete a document from the table.
 * @param {string} table The name of the directory.
 * @param {string} row The row id.
 * @returns {Promise<Object>}
 */
exports.delete = (table, row) => this.exec(`DELETE FROM \`${table}\` WHERE id = ${this.sanitize(row)}`);

/**
 * Update the columns from a table.
 * @param {string} table The name of the table.
 * @param {string[]} columns Array of columns.
 * @param {array[]} schema Tuples of keys/values from the schema.
 * @returns {boolean}
 */
exports.updateColumns = async (table, columns, schema) => {
  await this.exec(`CREATE TABLE \`temp_table\` (\n${schema.map(s => `\`${s[0]}\` ${s[1]}`).join(",\n")}\n);`);
  await this.exec(`INSERT INTO \`temp_table\` (\`${columns.join("`, `")}\`) SELECT \`${columns.join("`, `")}\` FROM \`${table}\`;`);
  await this.exec(`DROP TABLE \`${table}\`;`);
  await this.exec(`ALTER TABLE \`temp_table\` RENAME TO \`${table}\`;`);
  return true;
};

/**
 * Get a row from an arbitrary SQL query.
 * @param {string} sql The query to execute.
 * @returns {Promise<Object>}
 */
exports.run = sql => db.query(sql).then(([rows]) => rows[0]).catch(throwError);

/**
 * Get all rows from an arbitrary SQL query.
 * @param {string} sql The query to execute.
 * @returns {Promise<Object>}
 */
exports.runAll = sql => db.query(sql).catch(throwError);
exports.exec = (...args) => this.runAll(...args);

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
  Integer: "INT",
  Float: "INT",
  AutoID: "INT PRIMARY KEY AUTOINCREMENT UNIQUE",
  Timestamp: "DATETIME",
  AutoTS: "DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL",
};

exports.conf = {
  moduleName: "mysql",
  enabled: true,
  requiredModules: ["mysql2"],
  sql: true,
};

exports.help = {
  name: "mysql",
  type: "providers",
  description: "Allows you use MySQL functionality throughout Komada.",
};
