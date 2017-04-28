let r;
const config = {
  moduleName: "rethink",
  enabled: true,
  db: "Komada",
};

  /* Table methods */
exports.hasTable = table => r.tableList().run().then(data => data.includes(table));

exports.sync = table => r.table(table).sync().run();

exports.createTable = table => r.tableCreate(table).run();

exports.deleteTable = table => r.tableDrop(table).run();

  /* Document methods */
exports.all = table => r.table(table) || null;

exports.get = (table, id) => r.table(table).get(id) || null;

exports.getRandom = table => this.all(table).then(data => data[Math.floor(Math.random() * data.length)]);

exports.add = (table, doc) => r.table(table).insert(doc).run();

exports.update = (table, id, doc) => r.table(table).get(id).update(doc).run();

exports.append = (table, id, appendArray, doc) => r.table(table).get(id).update(object => ({ [appendArray]: object(appendArray).default([]).append(doc) })).run();

exports.replace = (table, id, doc) => r.table(table).get(id).replace(doc).run();

exports.delete = (table, id) => r.table(table).get(id).delete().run();

  /* Exports for the Download command */

exports.help = {};
exports.help.name = "rethinkdb";
exports.help.type = "providers";
exports.help.description = "Allows you use rethinkDB functionality throughout Komada.";
exports.conf = config;
exports.conf.requiredModules = ["rethinkdbdash"];

exports.init = () => {
  r = require("rethinkdbdash")(config.db);
};
