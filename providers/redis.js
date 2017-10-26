const Redis = require("redis-nextra");

const redis = new Redis()
  .on("ready", () => console.log("Redis Connected"))
  .on("serverReconnect", server => console.warn(`Redis server ${server.host.string} is reconnecting`))
  .on("error", err => console.error("Redis error:", err));

/* Table methods */

/**
 * Checks if the table exists.
 * @param {string} table the name of the table you want to check.
 * @returns {boolean}
 */
exports.hasTable = table => redis.tables.has(table);

/**
 * Creates a new table.
 * @param {string} table the name for the new table.
 * @returns {Object}
 */
exports.createTable = table => redis.createTable(table);

/**
 * Deletes a table.
 * @param {string} table the name of the table you want to drop.
 * @returns {Object}
 */
exports.deleteTable = table => redis.deleteTable(table);

/* Document methods */

/**
 * Get all entries from a table.
 * @param {string} table the name of the table you want to get the data from.
 * @returns {?array}
 */
exports.getAll = table => redis.table(table).valuesJson("*");

/**
 * Get an entry from a table.
 * @param {string} table the name of the table.
 * @param {string|number} id the entry's ID.
 * @returns {?Object}
 */
exports.get = (table, id) => redis.table(table).getJson(id);

/**
 * Check if an entry exists from a table.
 * @param {string} table the name of the table.
 * @param {string|number} id the entry's ID.
 * @returns {boolean}
 */
exports.has = (table, id) => redis.table(table).has(id);

/**
 * Insert a new document into a table.
 * @param {string} table the name of the table.
 * @param {string} id the id of the record.
 * @param {Object} value the object you want to insert in the table.
 * @param {?number} timer Amount of time in milliseconds for the value to expirate.
 * @returns {Object}
 */
exports.set = (table, id, value, timer) => redis.table(table).setJson(id, value, timer);

/**
 * Delete an entry from the table.
 * @param {string} table the name of the table.
 * @param {string|number} id the entry's ID.
 * @returns {Object}
 */
exports.delete = (table, id) => redis.table(table).del(id);

exports.conf = {
  enabled: false,
  cache: true,
  moduleName: "redis",
  requiredModules: ["redis-nextra"],
};

exports.help = {
  name: "redis",
  type: "providers",
  description: "Allows you use Redis functionality throughout Komada.",
};
