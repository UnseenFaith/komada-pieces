let db;
let fs;

const config = {
  moduleName: "sqlite",
  enabled: true,
  baseLocation: "./bwd/db/sqlite",
};
exports.conf = config;

const dataSchema = {
  str: {
    create: "TEXT",
    insert: value => value,
    select: value => value,
  },
  int: {
    create: "INTEGER",
    insert: value => parseInt(value),
    select: value => value,
  },
  autoid: {
    create: "INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE",
    insert: () => { throw "Cannot insert Auto ID value!"; },
    select: value => value,
  },
  timestamp: {
    create: "DATETIME",
    insert: value => parseInt(value),
    select: value => value,
  },
  autots: {
    create: "DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL",
    insert: () => { throw "Cannot insert Auto Timestamp value!"; },
    select: value => value,
  },
  bool: {
    create: "INTEGER",
    insert: value => !value ? 0 : -1,
    select: value => !!value,
  },
  json: {
    create: "TEXT",
    insert: value => JSON.stringify(value),
    select: value => JSON.parse(value),
  },
};

const schemaCache = new Map();

exports.init = async client => new Promise(async (resolve, reject) => {
  db = require("sqlite");
  fs = require("fs-extra-promisify");
  try {
    await fs.ensureDir(config.baseLocation);
    await db.open(`${config.baseLocation}/db.sqlite`);
    await db.run("CREATE TABLE IF NOT EXISTS dataProviderSchemas (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, name, schema)");
    const rows = await db.all("SELECT * FROM dataProviderSchemas");
    rows.map(r => schemaCache.set(r.name, JSON.parse(r.schema)));
    resolve();
  } catch (e) {
    reject(e);
  }
});

exports.insertSchema = (client, tableName, schema) => {
  schemaCache.set(tableName, schema);
  return db.run("INSERT INTO dataProviderSchemas (name, schema) VALUES (?, ?)", [tableName, JSON.stringify(schema)]);
};


exports.get = (client, table, key, value) => db.get(`SELECT * FROM ${table} WHERE ${key} = '${value}'`);

exports.getRandom = (client, table) => db.get(`SELECT * FROM ${table} ORDER BY RANDOM() LIMIT 1;`);

exports.getAll = (client, table, key = null, value = null) => {
  if (key) {
    return db.all(`SELECT * FROM ${table} WHERE ${key} = '${value}'`);
  }
  return db.all(`SELECT * FROM ${table}`);
};

exports.insert = (client, table, keys, values) => new Promise((resolve, reject) => {
  if (!schemaCache.has(table)) reject("Table not found in schema cache");
  let schema = schemaCache.get(table);
  schema = schema.filter(f => keys.includes(f.name));
  client.funcs.validateData(schema, keys, values); // automatically throws error
  const insertValues = schema.map((field, index) => dataSchema[field.type].insert(values[index]));
  const questionMarks = schema.map(() => "?").join(", ");
  client.funcs.log(`Inserting Values: ${insertValues.join(";")}`);
  db.run(`INSERT INTO ${table}(${keys.join(", ")}) VALUES(${questionMarks});`, insertValues)
      .then(resolve(true))
      .catch(e => reject(`Error inserting data: ${e}`));
});

exports.has = (client, table, key, value) => new Promise((resolve) => {
  db.get(`SELECT id FROM ${table} WHERE ${key} = '${value}'`)
      .then(() => resolve(true))
      .catch(() => resolve(false));
});

exports.update = (client, table, keys, values, whereKey, whereValue) => new Promise((resolve, reject) => {
  if (!schemaCache.has(table)) reject("Table not found in schema cache");
  const schema = schemaCache.get(table);
  const filtered = schema.filter(f => keys.includes(f.name));
  client.funcs.validateData(schema, keys, values);
  const inserts = filtered.map((field, index) => `${field.name} = ${dataSchema[field.type].insert(values[index])}`);
  db.run(`UPDATE ${table} SET ${inserts} WHERE ${whereKey} = '${whereValue}';`)
      .then(resolve(true))
      .catch(e => reject(`Error inserting data: ${e}`));
});

exports.delete = (client, table, key) => db.run(`DELETE FROM ${table} WHERE id = '${key}'`);

exports.hasTable = (client, table) => new Promise((resolve, reject) => {
  db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='${table}';`)
      .then((row) => {
        if (!row) resolve(false);
        resolve(true);
      })
      .catch(e => reject(e));
});

exports.createTable = (client, tableName, keys) => new Promise(async (resolve, reject) => {
  const tags = client.funcs.parseTags(keys);
  const schema = client.funcs.createDBSchema(tags);
  if (!schema.find(s => s.name === "id")) {
    schema.push({ name: "id", type: "autoid" });
  }
  const inserts = schema.map(field => `${field.name} ${dataSchema[field.type].create}`).join(", ");
  await db.run(`CREATE TABLE '${tableName}' (${inserts});`);
  this.insertSchema(client, tableName, schema).catch(reject);
  resolve(true);
});

exports.deleteTable = (client, tableName) => db.run(`DROP TABLE '${tableName}'`);

exports.run = sql => db.run(sql);

exports.help.name = "sqlite";
exports.help.description = "Allows you use SQLite functionality throughout Komada.";
exports.conf.requiredModules = ["sqlite", "fs-extra-promisify"];
