const mysql = require("mysql2/promise");

let db;
const options = {
  moduleName: "mysql",
  enabled: true,
  conn: {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "Komada",
  },
};

exports.init = async () => {
  db = await mysql.createConnection(options.conn);
};

/* Table methods */

/**
 * Checks if a table exists.
 * @param {string} table The name of the table you want to check.
 * @returns {Promise<boolean>}
 */
exports.hasTable = table => db.query(`SELECT 1 FROM ${table} LIMIT 1`)
  .then(() => true)
  .catch(() => false);

/**
 * Creates a new table.
 * @param {string} table The name for the new table.
 * @param {string} rows The rows for the table.
 * @returns {Promise<Object>}
 */
exports.createTable = (table, rows) => db.query(`CREATE TABLE '${table}' (${rows})`);

/**
 * Drops a table.
 * @param {string} table The name of the table to drop.
 * @returns {Promise<Object>}
 */
exports.deleteTable = table => db.query(`DROP TABLE '${table}'`);

/* Document methods */

/**
 * Get all documents from a table.
 * @param {string} table The name of the table to fetch from.
 * @returns {Promise<Object[]>}
 */
exports.getAll = async (table, { key = null, value = null }) => {
  const query = key ?
    `SELECT * FROM \`${table}\` WHERE \`${key}\` = '${value}'` :
    `SELECT * FROM \`${table}\``;
  return db.query(query)
      .then(([rows]) => rows);
};

/**
 * Get a row from a table.
 * @param {string} table The name of the table.
 * @param {string} key The row id or the key to find by. If value is undefined, it'll search by 'id'.
 * @param {string} [value=null] The desired value to find.
 * @returns {Promise<?Object>}
 */
exports.get = (table, key, value = null) => {
  const query = key && !value ?
    `SELECT * FROM \`${table}\` WHERE \`id\` = '${value}' LIMIT 1` :
    `SELECT * FROM \`${table}\` WHERE \`${key}\` = '${value}' LIMIT 1`;
  return db.query(query)
    .then(([rows]) => rows[0])
    .catch(() => null);
};

/**
 * Check if a row exists.
 * @param {string} table The name of the table
 * @param {string} value The value to search by 'id'.
 * @returns {Promise<boolean>}
 */
exports.has = (table, value) => db.query(`SELECT \`id\` FROM \`${table}\` WHERE \`id\` = '${value}' LIMIT 1`)
  .then(([rows]) => rows.length > 0);

/**
 * Get a random row from a table.
 * @param {string} table The name of the table.
 * @returns {Promise<Object>}
 */
exports.getRandom = table => db.query(`SELECT * FROM \`${table}\` ORDER BY RAND() LIMIT 1`);

/**
 * Insert a new document into a table.
 * @param {string} table The name of the table.
 * @param {string} row The row id.
 * @param {Object} data The object with all properties you want to insert into the document.
 * @returns {Promise<Object>}
 */
exports.create = (table, row, data) => {
  const { keys, values } = this.serialize(Object.assign(data, { id: row }));
  return db.query(`INSERT INTO \`${table}\` (\`${keys.join("`, `")}\`) VALUES ('${values.join("', '")}')`);
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
  const inserts = Object.entries(data).map(value => `\`${value[0]}\` = '${value[1]}'`).join(", ");
  return db.query(`UPDATE \`${table}\` SET ${inserts} WHERE id = '${row}'`);
};
exports.replace = (...args) => this.update(...args);

/**
 * Delete a document from the table.
 * @param {string} table The name of the directory.
 * @param {string} row The row id.
 * @returns {Promise<Object>}
 */
exports.delete = (table, row) => db.query(`DELETE FROM \`${table}\` WHERE id = '${row}'`);

/**
 * Get a row from an arbitrary SQL query.
 * @param {string} sql The query to execute.
 * @returns {Promise<Object>}
 */
exports.run = sql => db.query(sql).then(([rows]) => rows[0]);

/**
 * Get all rows from an arbitrary SQL query.
 * @param {string} sql The query to execute.
 * @returns {Promise<Object>}
 */
exports.runAll = sql => db.query(sql);
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

exports.conf = options;
exports.conf.requiredModules = ["mysql2"];

exports.help = {
  name: "mysql",
  type: "providers",
  description: "Allows you use MySQL functionality throughout Komada.",
};
